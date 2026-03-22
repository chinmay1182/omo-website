import { NextRequest, NextResponse } from 'next/server';
import {
  getSearchContext,
  performLocalSearch as dynamicPerformLocalSearch
} from '../../utils/contentIndex';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'service' | 'blog' | 'product' | 'section' | 'testimonial';
}

// ============ SECURITY: Rate limiting store ============
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function getClientIp(request: NextRequest): string {
  // Get IP from headers (supports proxies/behind Cloudflare)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIp || 'unknown';
}

function checkRateLimit(clientIp: string): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const limit = parseInt(process.env.API_RATE_LIMIT || '30', 10);
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);

  const record = requestCounts.get(clientIp);

  // Create new record if doesn't exist or window expired
  if (!record || now > record.resetTime) {
    const newRecord = { count: 1, resetTime: now + windowMs };
    requestCounts.set(clientIp, newRecord);
    return { allowed: true, remaining: limit - 1, resetTime: newRecord.resetTime };
  }

  // Check if limit exceeded
  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime
    };
  }

  // Increment and allow
  record.count++;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetTime: record.resetTime
  };
}

// Cleanup old records every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of requestCounts.entries()) {
    if (now > record.resetTime) {
      requestCounts.delete(key);
    }
  }
}, 300000);

// ============ SECURITY: Input validation & sanitization ============
function sanitizeQuery(query: string): string {
  // Remove potential XSS/injection attempts
  return query
    .trim()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'"]/g, '') // Remove quotes and brackets
    .slice(0, 200); // Max 200 characters
}

function validateQuery(query: string): { valid: boolean; error?: string } {
  if (!query || typeof query !== 'string') {
    return { valid: false, error: 'Invalid query' };
  }

  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return { valid: false, error: 'Query too short' };
  }

  if (trimmed.length > 200) {
    return { valid: false, error: 'Query too long' };
  }

  return { valid: true };
}

// ============ SECURITY: API Key validation (server-side only) ============
function validateApiKey(): { valid: boolean; error?: string } {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.length === 0) {
    console.error('[SECURITY] Gemini API key not configured');
    return { valid: false, error: 'API not configured' };
  }
  return { valid: true };
}

// Local search now uses dynamic content index (all services, blogs, pages)
// Wrapper function to cast results to local SearchResult type
function performLocalSearch(query: string): SearchResult[] {
  const results = dynamicPerformLocalSearch(query, 10);
  return results as SearchResult[];
}

// Gemini API search with context
function buildFallbackAnswer(query: string, localResults: SearchResult[]): string {
  if (localResults.length === 0) {
    return `I could not find a strong match for "${query}" on the website yet. Please try a more specific service, topic, blog, or policy question.`;
  }

  const topMatches = localResults
    .slice(0, 3)
    .map((result) => result.title)
    .join(', ');

  return `I found relevant website content around ${topMatches}. Open the matching results below for the most relevant OMO Digital pages and service details.`;
}

async function performGeminiSearch(query: string, localResults: SearchResult[]): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('Gemini API key not configured');
      return buildFallbackAnswer(query, localResults);
    }

    const contextDocuments = getSearchContext(query, 8);
    const serializedContext = contextDocuments
      .map((document, index) => {
        return [
          `Source ${index + 1}: ${document.title}`,
          `Type: ${document.type}`,
          `URL: ${document.url}`,
          `Summary: ${document.description}`,
          `Content: ${document.content}`
        ].join('\n');
      })
      .join('\n\n');

    const prompt = `You are the OMO Digital website answer engine.

Answer ONLY from the website context provided below. Do not invent services, claims, pricing, case studies, or policies that are not present in the context.
If the context is weak or missing, say that clearly and suggest the closest matching website sections.
Keep the answer concise: 2 short paragraphs maximum.
Mention the most relevant OMO Digital service, section, blog, product, or policy when appropriate.

User question: "${query}"

Website context:
${serializedContext || 'No matching website context was found.'}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: prompt,
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
          }
        })
      }
    );

    if (!response.ok) {
      console.error('Gemini API error:', response.statusText);
      return buildFallbackAnswer(query, localResults);
    }

    const data = await response.json();
    const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return aiResponse || buildFallbackAnswer(query, localResults);
  } catch (error) {
    console.error('Gemini search error:', error);
    return buildFallbackAnswer(query, localResults);
  }
}

export async function POST(request: NextRequest) {
  try {
    // ============ SECURITY: Rate limiting ============
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp);

    if (!rateLimit.allowed) {
      console.warn(`[SECURITY] Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000))
          }
        }
      );
    }

    // ============ SECURITY: CORS & Origin validation ============
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    const allowedOrigins = ['http://localhost:3000', 'https://omodigital.io', 'https://www.omodigital.io'];

    // Verify request comes from your domain (prevent CORS misuse)
    if (origin && !allowedOrigins.includes(origin)) {
      console.warn(`[SECURITY] Invalid origin: ${origin}`);
      return NextResponse.json(
        { error: 'Unauthorized origin' },
        { status: 403 }
      );
    }

    // ============ SECURITY: API Key validation ============
    const apiKeyValidation = validateApiKey();
    if (!apiKeyValidation.valid) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    // ============ SECURITY: Parse & validate body ============
    let body: any;
    try {
      body = await request.json();
    } catch (error) {
      console.warn('[SECURITY] Invalid JSON body received');
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // ============ SECURITY: Input validation & sanitization ============
    const queryValidation = validateQuery(body.query);
    if (!queryValidation.valid) {
      return NextResponse.json(
        { error: queryValidation.error || 'Invalid query' },
        { status: 400 }
      );
    }

    const sanitizedQuery = sanitizeQuery(body.query);

    // Log valid request (for monitoring)
    console.log(`[SEARCH] Query: "${sanitizedQuery.slice(0, 50)}..." | IP: ${clientIp} | Remaining: ${rateLimit.remaining}`);

    // ============ Search execution ============
    // Perform local search for quick results
    const localResults = performLocalSearch(sanitizedQuery);

    // Get AI response in parallel (non-blocking)
    const aiResponse = await performGeminiSearch(sanitizedQuery, localResults);

    return NextResponse.json(
      {
        results: localResults,
        aiResponse: aiResponse || null,
        query: sanitizedQuery,
        totalResults: localResults.length
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(rateLimit.remaining),
          'X-RateLimit-Reset': String(rateLimit.resetTime)
        }
      }
    );
  } catch (error) {
    // ============ SECURITY: Error handling (don't expose internal details) ============
    console.error('[ERROR] Search API error:', error);
    return NextResponse.json(
      { error: 'Search service error. Please try again.' },
      { status: 500 }
    );
  }
}
