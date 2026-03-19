'use client';

import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from '../Home.module.css';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const carouselData = [
    {
      heading: "Focus on growth—\nwe will handle the tech\nthat gets you there.",
      description: "Reliable, scalable, and hassle-free IT solutions\ntailored for your business success.",
      image: "/homesliders/dynamic.jpg",
      miniHeading: "IT Solutions",
      ctaLabel: "Explore Services",
      ctaHref: "#services",
    },
    {
      heading: "Transform your business\nwith cutting-edge\ndigital solutions.",
      description: "Modern web development and digital transformation\nservices to elevate your brand.",
      image: "/homesliders/dynamic1.jpg",
      miniHeading: "Web Development",
      ctaLabel: "See Our Search Experience",
      ctaHref: "#search",
    },
    {
      heading: "Secure, fast, and\nreliable cloud\ninfrastructure.",
      description: "Enterprise-grade cloud solutions that scale\nwith your business needs.",
      image: "/homesliders/dynamic2.jpg",
      miniHeading: "Cloud Services",
      ctaLabel: "Read Client Stories",
      ctaHref: "#testimonials",
    },
    {
      heading: "Data-driven insights\nfor smarter business\ndecisions.",
      description: "Advanced analytics and business intelligence\nto unlock your data's potential.",
      image: "/homesliders/dynamic3.jpg",
      miniHeading: "Analytics",
      ctaLabel: "Talk to Our Team",
      ctaHref: "#contact",
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselData.length);
      }, 4000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, carouselData.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <Head>
        <title>OMO Digital</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
          rel="stylesheet"
        />

      </Head>

      <div id="home" className={styles.mainContainer}>
        <main className={styles.mainContent}>
          <div className="container">
            <div className="row align-items-center min-vh-80">
              <div className="col-lg-6 p-0">
                <div className={styles.contentSection}>
                  <h1 className={styles.mainHeading}>
                    {carouselData[currentSlide].heading.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < carouselData[currentSlide].heading.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </h1>

                  <p className={styles.mainDescription}>
                    {carouselData[currentSlide].description.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < carouselData[currentSlide].description.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <a href={carouselData[currentSlide].ctaHref} className={styles.viewMoreBtn}>
                    {carouselData[currentSlide].ctaLabel}
                    <ArrowRight size={18} />
                  </a>


                  {/* Carousel Dots + Play/Pause Button */}
                  <div className={styles.carouselControls}>
                    <div className={styles.carouselDots}>
                      {carouselData.map((_, index) => (
                        <button
                          key={index}
                          className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
                          onClick={() => handleDotClick(index)}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                    {/* <button
                      className={styles.playPauseBtn}
                      onClick={togglePlayPause}
                      aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </button> */}
                  </div>
                </div>

              </div>

              <div className="col-lg-6">
                <div className={styles.heroImage}>
                  <Image
                    src={carouselData[currentSlide].image}
                    alt="Hero Image"
                    width={600}
                    height={537}
                    unoptimized
                    className={styles.heroImageElement}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>


      </div>
    </>
  );
}
