/**
 * Dynamic website content index used by the search experience.
 * This keeps the AI answer engine grounded in real website copy.
 */

import { BLOG_POSTS, PAGES, PRODUCTS, SERVICES } from '../config/contentConfig';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'service' | 'blog' | 'page' | 'product' | 'section' | 'testimonial';
}

export interface SearchDocument extends SearchResult {
  keywords: string[];
  content: string;
}

const WEBSITE_SECTIONS: SearchDocument[] = [
  {
    id: 'search-engine',
    title: 'AI Answer Engine',
    description: 'Ask technology, delivery, service, or policy questions and get guided answers based on OMO Digital website content.',
    url: '/#search',
    type: 'section',
    keywords: ['ai answer engine', 'search', 'questions', 'website search', 'omo digital ai'],
    content:
      'The AI answer engine helps visitors ask tech questions, search the site, and discover relevant OMO Digital services, blog posts, contact paths, and legal information.'
  },
  {
    id: 'hero-growth',
    title: 'Growth-Focused Technology Delivery',
    description: 'OMO Digital positions itself as a partner that handles reliable, scalable, and hassle-free technology so clients can focus on growth.',
    url: '/#home',
    type: 'section',
    keywords: ['growth', 'technology partner', 'reliable', 'scalable', 'digital solutions'],
    content:
      'OMO Digital helps businesses focus on growth by handling web development, digital transformation, cloud infrastructure, analytics, and broader technology delivery.'
  },
  {
    id: 'focus-areas',
    title: 'Focus Areas',
    description: 'Purpose-built solutions across website development, UI UX, mobile apps, AI ML and blockchain, IT advisory, and brand management.',
    url: '/#services',
    type: 'section',
    keywords: ['website development', 'ui ux', 'illustrations', 'mobile application development', 'ai ml', 'blockchain', 'it consultancy', 'brand management'],
    content:
      'OMO Digital focus areas include website development, UI UX and illustrations, mobile application development, AI ML and blockchain, IT consultancy and advisory, and brand management.'
  },
  {
    id: 'contact-consultation',
    title: 'Contact and Consultation',
    description: 'Visitors can contact OMO Digital for a quick consultation to start digital transformation projects, product builds, or advisory work.',
    url: '/#contact',
    type: 'section',
    keywords: ['contact', 'consultation', 'project enquiry', 'hello@omodigital.io'],
    content:
      'OMO Digital invites visitors to get in touch for consultations, proposals, support, and next steps on digital transformation or product work.'
  },
  {
    id: 'client-stories',
    title: 'Client Stories and Testimonials',
    description: 'Clients highlight stronger efficiency, scalable architecture, improved user experience, reliability, and higher conversions after working with OMO Digital.',
    url: '/#testimonials',
    type: 'section',
    keywords: ['testimonials', 'client stories', 'operational efficiency', 'conversions', 'deployment time'],
    content:
      'Client stories describe legacy modernization, scalable architecture, better user experience, faster deployments, stronger reliability, and improved conversion performance.'
  }
];

const TESTIMONIALS: SearchDocument[] = [
  {
    id: 'testimonial-legacy-systems',
    title: 'Legacy Modernization Testimonial',
    description: 'A client reported a 40 percent increase in operational efficiency after OMO Digital transformed legacy systems.',
    url: '/#testimonials',
    type: 'testimonial',
    keywords: ['legacy systems', 'operational efficiency', 'cto', 'transformation'],
    content:
      'A chief technology officer said OMO Digital transformed legacy systems, aligned delivery to business goals, and helped improve operational efficiency by 40 percent.'
  },
  {
    id: 'testimonial-architecture',
    title: 'Scalable Architecture Testimonial',
    description: 'A software architect praised bold digital enhancements, scalable architecture, and strong product launch quality.',
    url: '/#testimonials',
    type: 'testimonial',
    keywords: ['scalable architecture', 'product launch', 'software architect'],
    content:
      'A senior software architect said OMO Digital delivered scalable architecture, quality execution, and digital enhancements beyond the original brief.'
  },
  {
    id: 'testimonial-ux-roadmap',
    title: 'User Experience Improvement Testimonial',
    description: 'A product strategy leader described transformed user experience and roadmap improvements from OMO Digital support.',
    url: '/#testimonials',
    type: 'testimonial',
    keywords: ['user experience', 'product roadmap', 'tight deadlines'],
    content:
      'A product strategy director said OMO Digital improved user experience, delivered on tight deadlines, and contributed roadmap insights.'
  },
  {
    id: 'testimonial-devops',
    title: 'Infrastructure Reliability Testimonial',
    description: 'A DevOps leader noted deployment time reduction of 60 percent and better system reliability after infrastructure improvements.',
    url: '/#testimonials',
    type: 'testimonial',
    keywords: ['devops', 'deployment time', 'system reliability', 'infrastructure'],
    content:
      'A lead DevOps engineer said OMO Digital reduced deployment time by 60 percent and improved reliability through infrastructure work.'
  },
  {
    id: 'testimonial-conversions',
    title: 'Conversion Growth Testimonial',
    description: 'A marketing leader credited OMO Digital with a 250 percent increase in online conversion rates.',
    url: '/#testimonials',
    type: 'testimonial',
    keywords: ['conversion rates', 'digital marketing', 'engagement'],
    content:
      'A digital marketing director said OMO Digital improved user engagement and increased online conversion rates by 250 percent.'
  }
];

const LEGAL_SUMMARIES: SearchDocument[] = [
  {
    id: 'privacy-summary',
    title: 'Privacy Policy Summary',
    description: 'OMO Digital collects contact and project details to respond to enquiries, deliver services, and improve support.',
    url: '/privacy-policy',
    type: 'page',
    keywords: ['privacy policy', 'personal data', 'contact details', 'delete data'],
    content:
      'The privacy policy says OMO Digital collects contact details, project information, and communication history when visitors submit forms, contact the team, or subscribe to updates. The information is used for replies, proposals, service delivery, updates, and records. Visitors can request access, correction, or deletion by contacting hello@omodigital.io.'
  },
  {
    id: 'terms-summary',
    title: 'Terms of Service Summary',
    description: 'Website use must be lawful, service engagements rely on separate agreements, and support questions can be sent to OMO Digital.',
    url: '/terms-of-service',
    type: 'page',
    keywords: ['terms of service', 'lawful use', 'service engagements', 'contracts'],
    content:
      'The terms of service govern website use, contact forms, and digital services. Users must act lawfully and provide accurate information. Project, consulting, and product work follow separate commercial agreements, timelines, and confirmed scopes.'
  },
  {
    id: 'refund-summary',
    title: 'Refund Policy Summary',
    description: 'Refund eligibility depends on agreement terms, delivery stage, and completed work, with most completed project work generally non-refundable.',
    url: '/refund-policy',
    type: 'page',
    keywords: ['refund policy', 'non-refundable', 'project services', 'invoice'],
    content:
      'The refund policy says refunds depend on the service agreement, delivery stage, and completed work. Strategy, design, development, and consulting work are usually billed against time and milestones and are generally non-refundable unless agreed in writing. Product-specific refund terms are shared during onboarding or in the relevant agreement.'
  },
  {
    id: 'acceptable-use-summary',
    title: 'Acceptable Use Policy Summary',
    description: 'Visitors and clients must use OMO Digital platforms lawfully and avoid malware, spam, abuse, or unauthorized access.',
    url: '/acceptable-use-policy',
    type: 'page',
    keywords: ['acceptable use policy', 'malware', 'spam', 'authorized access', 'security'],
    content:
      'The acceptable use policy prohibits malware, unauthorized access attempts, spam, intellectual property infringement, abusive conduct, and unlawful activity. OMO Digital may suspend access if activity threatens users, systems, partners, or legal obligations.'
  }
];

function buildServiceDocuments(): SearchDocument[] {
  return SERVICES.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    url: '/#services',
    type: 'service',
    keywords: [service.category || '', service.title, service.description].join(' ').toLowerCase().split(/[^a-z0-9]+/i).filter(Boolean),
    content: `${service.title}. ${service.description}`
  }));
}

function buildBlogDocuments(): SearchDocument[] {
  return BLOG_POSTS.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.excerpt,
    url: '/#blog',
    type: 'blog',
    keywords: [post.author, post.title, post.excerpt].join(' ').toLowerCase().split(/[^a-z0-9]+/i).filter(Boolean),
    content: `${post.title}. ${post.excerpt} ${post.content || ''}`
  }));
}

function buildPageDocuments(): SearchDocument[] {
  return PAGES.map((page) => ({
    id: page.id,
    title: page.title,
    description: page.description,
    url: page.url,
    type: page.type === 'section' ? 'section' : 'page',
    keywords: [page.title, page.description, page.url].join(' ').toLowerCase().split(/[^a-z0-9]+/i).filter(Boolean),
    content: `${page.title}. ${page.description}`
  }));
}

function buildProductDocuments(): SearchDocument[] {
  return PRODUCTS.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    url: product.url,
    type: 'product',
    keywords: [product.title, product.description].join(' ').toLowerCase().split(/[^a-z0-9]+/i).filter(Boolean),
    content: `${product.title}. ${product.description}`
  }));
}

export function generateSearchIndex(): SearchDocument[] {
  return [
    ...buildServiceDocuments(),
    ...buildBlogDocuments(),
    ...buildPageDocuments(),
    ...buildProductDocuments(),
    ...WEBSITE_SECTIONS,
    ...TESTIMONIALS,
    ...LEGAL_SUMMARIES
  ];
}

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/\s+/g, ' ').trim();
}

function tokenize(value: string): string[] {
  return normalizeText(value)
    .split(/[^a-z0-9]+/i)
    .map((token) => token.trim())
    .filter((token) => token.length > 1);
}

function scoreDocument(document: SearchDocument, query: string): number {
  const normalizedQuery = normalizeText(query);
  const tokens = tokenize(query);
  const title = normalizeText(document.title);
  const description = normalizeText(document.description);
  const content = normalizeText(document.content);
  const keywordSet = new Set(document.keywords.map((keyword) => normalizeText(keyword)));

  let score = 0;

  if (title === normalizedQuery) score += 150;
  if (title.includes(normalizedQuery)) score += 90;
  if (description.includes(normalizedQuery)) score += 50;
  if (content.includes(normalizedQuery)) score += 40;

  for (const token of tokens) {
    if (title.includes(token)) score += 24;
    if (description.includes(token)) score += 12;
    if (content.includes(token)) score += 8;
    if (keywordSet.has(token)) score += 18;
    if ([...keywordSet].some((keyword) => keyword.includes(token))) score += 8;
  }

  if (document.type === 'service' || document.type === 'product') score += 4;

  return score;
}

export function performLocalSearch(query: string, maxResults: number = 10): SearchResult[] {
  if (!query.trim()) return [];

  return generateSearchIndex()
    .map((document) => ({ document, score: scoreDocument(document, query) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(({ document }) => ({
      id: document.id,
      title: document.title,
      description: document.description,
      url: document.url,
      type: document.type
    }));
}

export function getSearchContext(query: string, maxDocuments: number = 8): SearchDocument[] {
  if (!query.trim()) return [];

  return generateSearchIndex()
    .map((document) => ({ document, score: scoreDocument(document, query) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxDocuments)
    .map(({ document }) => document);
}

export function getSearchSuggestions(): string[] {
  return [
    'What services does OMO offer in Cloud Migration?',
    'What services does OMO offer in Cybersecurity?',
    'How can OMO help with AI readiness?'
  ];
}

export function getPaginatedSearchResults(
  query: string,
  page: number = 1,
  pageSize: number = 10
): { results: SearchResult[]; total: number; page: number; pageSize: number } {
  const allResults = performLocalSearch(query, 100);
  const total = allResults.length;
  const startIndex = (page - 1) * pageSize;

  return {
    results: allResults.slice(startIndex, startIndex + pageSize),
    total,
    page,
    pageSize
  };
}

export function getRelatedItems(itemId: string, limit: number = 5): SearchResult[] {
  const documents = generateSearchIndex();
  const currentDocument = documents.find((document) => document.id === itemId);

  if (!currentDocument) return [];

  const query = `${currentDocument.title} ${currentDocument.description} ${currentDocument.keywords.join(' ')}`;

  return documents
    .filter((document) => document.id !== itemId)
    .map((document) => ({ document, score: scoreDocument(document, query) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ document }) => ({
      id: document.id,
      title: document.title,
      description: document.description,
      url: document.url,
      type: document.type
    }));
}

export function getTotalIndexSize(): { services: number; blogs: number; pages: number; total: number } {
  const totalDocuments = generateSearchIndex();

  return {
    services: totalDocuments.filter((document) => document.type === 'service' || document.type === 'product').length,
    blogs: totalDocuments.filter((document) => document.type === 'blog').length,
    pages: totalDocuments.filter((document) => document.type === 'page' || document.type === 'section').length,
    total: totalDocuments.length
  };
}
