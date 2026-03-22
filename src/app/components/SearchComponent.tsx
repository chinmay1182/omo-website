"use client";

import React, { useState } from 'react';
import { ExternalLink, LoaderCircle, Search } from 'lucide-react';
import styles from '../SearchComponent.module.css';

interface Suggestion {
  title: string;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'service' | 'blog' | 'product' | 'section' | 'testimonial';
}

interface SearchResponse {
  results: SearchResult[];
  aiResponse: string | null;
  query: string;
  totalResults: number;
  error?: string;
}

const suggestions: Suggestion[] = [
  { title: 'What services does OMO offer in Cloud Migration?' },
  { title: 'What services does OMO offer in Cybersecurity?' },
  { title: 'How can OMO help with AI readiness?' }
];

const SearchComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSearch = async (query: string) => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setError('Please enter at least 2 characters.');
      setResults([]);
      setAiResponse(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSubmittedQuery(trimmedQuery);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: trimmedQuery })
      });

      const data: SearchResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Search failed. Please try again.');
      }

      setResults(data.results || []);
      setAiResponse(data.aiResponse || null);
    } catch (searchError) {
      const message =
        searchError instanceof Error ? searchError.message : 'Search failed. Please try again.';
      setError(message);
      setResults([]);
      setAiResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await runSearch(searchQuery);
  };

  const handleSuggestionClick = async (suggestion: string) => {
    setSearchQuery(suggestion);
    await runSearch(suggestion);
  };

  return (
    <div id="search" className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>Have tech questions?</h1>
            <p className={styles.subtitle}>
              Our <span className={styles.highlight}>AI answer engine</span> can help.
            </p>
          </div>

          <div className={styles.cardContentTwo}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.searchContainer}>
                <div className={styles.searchInputWrapper}>
                  <input
                    type="text"
                    placeholder="Please ask a question or initiate a search."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className={styles.searchInput}
                    aria-label="Search the OMO Digital website"
                  />
                  <button
                    type="submit"
                    className={styles.searchButton}
                    disabled={isLoading}
                    aria-label="Search"
                  >
                    {isLoading ? <LoaderCircle size={18} className={styles.spinner} /> : <Search size={18} />}
                  </button>
                </div>
              </div>
            </form>

            {error ? <p className={styles.errorMessage}>{error}</p> : null}

            {submittedQuery && !error ? (
              <div className={styles.resultsPanel}>
                <div className={styles.resultsHeader}>
                  <p className={styles.resultsLabel}>Search results for</p>
                  <h3 className={styles.resultsQuery}>{submittedQuery}</h3>
                </div>

                {aiResponse ? (
                  <div className={styles.aiAnswerCard}>
                    <p className={styles.aiAnswerLabel}>AI answer</p>
                    <p className={styles.aiAnswerText}>{aiResponse}</p>
                  </div>
                ) : null}

                <div className={styles.resultsList}>
                  {results.length > 0 ? (
                    results.map((result) => (
                      <a key={result.id} href={result.url} className={styles.resultCard}>
                        <div>
                          <p className={styles.resultType}>{result.type}</p>
                          <h4 className={styles.resultTitle}>{result.title}</h4>
                          <p className={styles.resultDescription}>{result.description}</p>
                        </div>
                        <ExternalLink size={16} className={styles.resultIcon} />
                      </a>
                    ))
                  ) : (
                    <div className={styles.emptyState}>
                      <p className={styles.emptyStateTitle}>No direct matches found</p>
                      <p className={styles.emptyStateText}>
                        Try a more specific service, solution, policy, or blog topic.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            <div className={styles.suggestionsSection}>
              <h3 className={styles.suggestionsTitle}>Suggestions</h3>
              <div className={styles.suggestionsGrid}>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={styles.suggestionCard}
                    onClick={() => handleSuggestionClick(suggestion.title)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        void handleSuggestionClick(suggestion.title);
                      }
                    }}
                  >
                    <p className={styles.suggestionText}>{suggestion.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
