'use client';

import React, { useState, useEffect } from 'react';
import styles from '../BlogSection.module.css';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../config/contentConfig';

const BlogSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Use blog posts from centralized config
  const blogPosts = BLOG_POSTS;

  const visiblePosts = 3.5; // Show 3.5 cards at a time
  const maxIndex = Math.max(0, blogPosts.length - Math.floor(visiblePosts));

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= maxIndex) {
          return 0; // Reset to beginning
        }
        return prev + 1;
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <div id="blog" className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Blogs, News and Articles</h2>
      </div>

      <div
        className={styles.carouselContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          aria-label="Previous posts"
        >
          <ArrowLeft size={20} />
        </button>

        <div className={styles.carousel}>
          <div
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${currentIndex * (100 / visiblePosts)}%)`,
            }}
          >
            {blogPosts.map((post) => (
              <div key={post.id} className={styles.blogCard}>
                <div className={styles.imageContainer}>
                  <div className={styles.placeholderImage}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>


                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <div className={styles.authorSection}>
                    <div className={styles.authorAvatar}></div>
                    <span className={styles.authorName}>{post.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
          aria-label="Next posts"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      <div className={styles.indicators}>
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''
              }`}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
