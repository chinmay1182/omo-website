/**
 * Dynamic content indexing system
 * Generates searchable content from configuration
 * Can be extended to crawl more dynamic content
 */

import { SERVICES, BLOG_POSTS, PAGES, PRODUCTS } from '../config/contentConfig';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'service' | 'blog' | 'page' | 'product';
}

/**
 * Generate all searchable content dynamically
 * This function can be called at build time or runtime
 */
export function generateSearchIndex(): SearchResult[] {
  const index: SearchResult[] = [];

  // ============ Add Services ============
  SERVICES.forEach((service) => {
    index.push({
      id: service.id,
      title: service.title,
      description: service.description,
      url: '/#services',
      type: 'service'
    });
  });

  // ============ Add Blog Posts ============
  BLOG_POSTS.forEach((post) => {
    index.push({
      id: post.id,
      title: post.title,
      description: post.excerpt,
      url: '/#blog',
      type: 'blog'
    });
  });

  // ============ Add Pages ============
  PAGES.forEach((page) => {
    index.push({
      id: page.id,
      title: page.title,
      description: page.description,
      url: page.url,
      type: 'page'
    });
  });

  // ============ Add Products ============
  PRODUCTS.forEach((product) => {
    index.push({
      id: product.id,
      title: product.title,
      description: product.description,
      url: product.url,
      type: 'service' // Treat products as services for search
    });
  });

  return index;
}

/**
 * Perform local search on generated index
 * Returns top matches based on relevance
 */
export function performLocalSearch(query: string, maxResults: number = 10): SearchResult[] {
  if (!query.trim()) return [];

  const searchIndex = generateSearchIndex();
  const normalizedQuery = query.toLowerCase();

  // Calculate relevance score for each item
  const scoredResults = searchIndex
    .map((item) => {
      let score = 0;

      // Exact title match (highest priority)
      if (item.title.toLowerCase() === normalizedQuery) {
        score += 100;
      }
      // Title contains query (high priority)
      else if (item.title.toLowerCase().includes(normalizedQuery)) {
        score += 50;
      }

      // Description contains query
      if (item.description.toLowerCase().includes(normalizedQuery)) {
        score += 25;
      }

      // Type boost (services more relevant for searches)
      if (item.type === 'service') score += 5;
      if (item.type === 'blog') score += 3;

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(({ score, ...item }) => item); // Remove score from returned data

  return scoredResults;
}

/**
 * Search suggestions - commonly searched items
 */
export function getSearchSuggestions(): string[] {
  return [
    'What services does OMO offer in Web Development?',
    'How can OMO help with Cloud Migration?',
    'Do you offer mobile app development?',
    'What is OMO CRM?',
    'Tell me about your design services',
    'How does OMO approach AI and ML projects?',
    'What managed services do you offer?',
    'Do you have case studies or client stories?'
  ];
}

/**
 * Get paginated search results
 */
export function getPaginatedSearchResults(
  query: string,
  page: number = 1,
  pageSize: number = 10
): { results: SearchResult[]; total: number; page: number; pageSize: number } {
  const allResults = performLocalSearch(query, 100);
  const total = allResults.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    results: allResults.slice(startIndex, endIndex),
    total,
    page,
    pageSize
  };
}

/**
 * Get related items based on a given item
 */
export function getRelatedItems(itemId: string, limit: number = 5): SearchResult[] {
  const searchIndex = generateSearchIndex();
  const item = searchIndex.find((i) => i.id === itemId);

  if (!item) return [];

  const keywords = item.title.toLowerCase().split(' ');
  const relatedItems = searchIndex
    .filter((i) => i.id !== itemId)
    .map((i) => {
      let matchCount = 0;
      keywords.forEach((keyword) => {
        if (keyword.length > 2) {
          if (i.title.toLowerCase().includes(keyword)) matchCount += 2;
          if (i.description.toLowerCase().includes(keyword)) matchCount += 1;
        }
      });
      return { ...i, matchCount };
    })
    .filter((i) => i.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, limit)
    .map(({ matchCount, ...item }) => item);

  return relatedItems;
}

/**
 * Count total searchable items
 */
export function getTotalIndexSize(): { services: number; blogs: number; pages: number; total: number } {
  return {
    services: SERVICES.length + PRODUCTS.length,
    blogs: BLOG_POSTS.length,
    pages: PAGES.length,
    total: SERVICES.length + BLOG_POSTS.length + PAGES.length + PRODUCTS.length
  };
}
