'use client';

import React, { useState, useEffect } from 'react';
import styles from '../BlogSection.module.css';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  image: string;
}

const BlogSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "How Modern Websites Turn Attention Into Qualified Leads",
      excerpt: "A high-performing website is more than design. It needs clarity, trust signals, strong messaging, and friction-free enquiry flows that help businesses convert visitors into real conversations.",
      author: "OMO Digital Team",
      image: "/blogs/image6.jpg"
    },
    {
      id: 2,
      title: "Why Fast, Scalable Web Development Matters for Growing Brands",
      excerpt: "As your business grows, your digital stack should keep up. We focus on performance, maintainability, and scalable architecture so teams can launch faster and improve with confidence.",
      author: "OMO Digital Team",
      image: "/blogs/image7.jpg"
    },
    {
      id: 3,
      title: "Design Systems That Keep Products Consistent and Conversion-Ready",
      excerpt: "From landing pages to product dashboards, a strong design system helps brands move faster, stay consistent, and deliver a cleaner user experience at every touchpoint.",
      author: "OMO Digital Team",
      image: "/blogs/image8.jpg"
    },
    {
      id: 4,
      title: "What Businesses Should Expect From a Reliable Digital Partner",
      excerpt: "Delivery should not stop at launch. The right partner brings communication, iteration, technical ownership, and long-term support so digital investments keep creating business value.",
      author: "OMO Digital Team",
      image: "/blogs/image10.jpg"
    },
    {
      id: 5,
      title: "Why CRM and Internal Tools Are Becoming Growth Essentials",
      excerpt: "Custom internal tools and CRM workflows help teams manage leads, follow-ups, service delivery, and reporting in one place, reducing chaos and improving response quality.",
      author: "OMO Digital Team",
      image: "/blogs/image9.jpg"
    }
  ];

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
                      unoptimized
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
