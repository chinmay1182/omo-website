"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, BriefcaseBusiness, FileText, LoaderCircle, Search, SearchX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './SearchModal.module.css';
import TranslatedText from './TranslatedText';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'service' | 'blog' | 'faq';
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchData: SearchResult[] = [
  {
    id: '1',
    title: 'Web Development Services',
    description: 'Custom web development solutions using modern technologies',
    url: '/#services',
    type: 'service'
  },
  {
    id: '2',
    title: 'Quick Contact',
    description: 'Talk to our team about your next product, platform, or website build',
    url: '/#contact',
    type: 'service'
  },
  {
    id: '3',
    title: 'Client Stories',
    description: 'See how our clients are using design and technology to grow',
    url: '/#testimonials',
    type: 'page'
  },
  {
    id: '4',
    title: 'About OMO Digital',
    description: 'Learn how we approach partnerships, delivery, and digital transformation',
    url: '/#company',
    type: 'page'
  },
  {
    id: '5',
    title: 'Blogs and Articles',
    description: 'Browse our latest product, design, and technology content',
    url: '/#blog',
    type: 'blog'
  }
];

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      setSelectedIndex(-1);
      return;
    }

    setIsLoading(true);

    const timeoutId = window.setTimeout(() => {
      const normalizedQuery = query.toLowerCase();
      const filteredResults = searchData.filter((item) =>
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery)
      );

      setResults(filteredResults);
      setSelectedIndex(-1);
      setIsLoading(false);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  const handleResultClick = useCallback((result: SearchResult) => {
    router.push(result.url);
    onClose();
  }, [onClose, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleResultClick, isOpen, onClose, results, selectedIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'service':
        return BriefcaseBusiness;
      case 'page':
        return FileText;
      case 'blog':
        return FileText;
      default:
        return Search;
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <span className={styles.searchIcon}>
              <Search size={18} />
            </span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search services, pages, and more..."
              value={query}
              onChange={handleInputChange}
              className={styles.searchInput}
            />
            {isLoading && (
              <span className={styles.loadingIcon}>
                <LoaderCircle size={18} />
              </span>
            )}
          </div>
        </div>

        <div className={styles.resultsContainer}>
          {query && !isLoading && results.length === 0 && (
            <div className={styles.noResults}>
              <SearchX size={36} />
              <p><TranslatedText text="No results found" /></p>
              <small><TranslatedText text="Try different keywords" /></small>
            </div>
          )}

          {results.length > 0 && (
            <div className={styles.results}>
              <div className={styles.resultsHeader}>
                <TranslatedText text="Search Results" />
                <span className={styles.resultCount}>
                  {results.length} {results.length === 1 ? 'result' : 'results'}
                </span>
              </div>
              
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className={`${styles.resultItem} ${
                    index === selectedIndex ? styles.selected : ''
                  }`}
                  onClick={() => handleResultClick(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {React.createElement(getResultIcon(result.type), { className: styles.resultIcon, size: 18 })}
                  <div className={styles.resultContent}>
                    <h3 className={styles.resultTitle}>{result.title}</h3>
                    <p className={styles.resultDescription}>{result.description}</p>
                    <span className={styles.resultUrl}>{result.url}</span>
                  </div>
                  <ArrowRight className={styles.resultArrow} size={18} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.shortcuts}>
            <span className={styles.shortcut}>
              <kbd>↑</kbd><kbd>↓</kbd> <TranslatedText text="to navigate" />
            </span>
            <span className={styles.shortcut}>
              <kbd>↵</kbd> <TranslatedText text="to select" />
            </span>
            <span className={styles.shortcut}>
              <kbd>esc</kbd> <TranslatedText text="to close" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
