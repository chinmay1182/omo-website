import { NextRequest, NextResponse } from 'next/server';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'service' | 'blog' | 'faq';
}

// Site content database for context
const siteContent: SearchResult[] = [
  {
    id: '1',
    title: 'Web Development Services',
    description: 'Custom web development solutions using modern technologies like Next.js, React, and Node.js',
    url: '/#services',
    type: 'service'
  },
  {
    id: '2',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile app development for iOS and Android',
    url: '/#services',
    type: 'service'
  },
  {
    id: '3',
    title: 'UI/UX Design',
    description: 'User-centered design and interface design services',
    url: '/#services',
    type: 'service'
  },
  {
    id: '4',
    title: 'Cloud Migration',
    description: 'Enterprise cloud solutions and migration services',
    url: '/#services',
    type: 'service'
  },
  {
    id: '5',
    title: 'AI/ML & Blockchain',
    description: 'Artificial intelligence, machine learning, and blockchain solutions',
    url: '/#services',
    type: 'service'
  },
  {
    id: '6',
    title: 'IT Consulting & Advisory',
    description: 'Strategic IT consulting and technology advisory services',
    url: '/#services',
    type: 'service'
  },
  {
    id: '7',
    title: 'Managed Services',
    description: 'Managed IT services and support for your infrastructure',
    url: '/#services',
    type: 'service'
  },
  {
    id: '8',
    title: 'Brand Management',
    description: 'Digital branding and brand management solutions',
    url: '/#services',
    type: 'service'
  },
  {
    id: '9',
    title: 'Quick Contact',
    description: 'Get in touch with our team about your project needs',
    url: '/#contact',
    type: 'page'
  },
  {
    id: '10',
    title: 'Client Stories',
    description: 'See how our clients are using design and technology to grow',
    url: '/#testimonials',
    type: 'page'
  },
  {
    id: '11',
    title: 'About OMO Digital',
    description: 'Learn about OMO Digital, our mission, and approach to digital transformation',
    url: '/#company',
    type: 'page'
  },
  {
    id: '12',
    title: 'Blogs and Articles',
    description: 'Browse our latest insights on technology, design, and digital transformation',
    url: '/#blog',
    type: 'blog'
  },
  {
    id: '13',
    title: 'OMO CRM',
    description: 'Manage leads, follow-ups, and customer conversations in one place',
    url: 'https://crm.omodigital.io/',
    type: 'service'
  }
];

// Simple local search - client-side filtering
function performLocalSearch(query: string): SearchResult[] {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase();
  return siteContent
    .filter(item =>
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery)
    )
    .slice(0, 5); // Return top 5 results
}

// Gemini API search with context
async function performGeminiSearch(query: string): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('Gemini API key not configured');
      return '';
    }

    // Build context from site content
    const context = siteContent
      .map(item => `- ${item.title}: ${item.description}`)
      .join('\n');

    const prompt = `You are a helpful assistant for OMO Digital, a digital transformation company. 

Based on the following services and pages available on our website:
${context}

Answer the user's question about our services, team, or company in a friendly and concise way (2-3 sentences max).
If the question is about something specific on our site, mention the relevant service or page.

User's question: "${query}"

Provide a helpful response about OMO Digital services.`;

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
    const body = await request.json();
    const query = body.query?.trim();

    if (!query) {
      return NextResponse.json(
        { results: [], aiResponse: '' },
        { status: 400 }
      );
    }

    // Perform local search for quick results
    const localResults = performLocalSearch(query);

    // Get AI response in parallel (non-blocking)
    const aiResponse = await performGeminiSearch(query);

    return NextResponse.json({
      results: localResults,
      aiResponse: aiResponse || null,
      query: query
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Search failed', results: [], aiResponse: null },
      { status: 500 }
    );
  }
}
