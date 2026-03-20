import { NextRequest, NextResponse } from 'next/server';
import { performLocalSearch as dynamicPerformLocalSearch } from '../../utils/contentIndex';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'service' | 'blog' | 'product';
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
async function performGeminiSearch(query: string): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('Gemini API key not configured');
      return '';
    }

    const prompt = `You are a helpful assistant for OMO Digital, a digital transformation company that offers:
- Web Development Services (React, Next.js, Node.js)
- Mobile Development (iOS & Android)
- UI/UX Design Services
- Cloud Migration Services
- AI/ML & Blockchain Solutions
- IT Consulting & Advisory
- Managed Services & Support
- Brand Management Services
- OMO CRM for sales and lead management

The company also publishes blogs on digital transformation, design systems, web development, and business growth.

Answer the user's question about these services or company in a friendly, concise way (2-3 sentences max).
If relevant, mention which service or solution might help them.

User's question: "${query}"`;

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
      return '';
    }

    const data = await response.json();
    const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return aiResponse;
  } catch (error) {
    console.error('Gemini search error:', error);
    return '';
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
    const aiResponse = await performGeminiSearch(sanitizedQuery);

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
