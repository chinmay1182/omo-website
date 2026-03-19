"use client"
import { ArrowUpRight } from 'lucide-react';
import styles from '../HeroSection.module.css';

const HeroSection = () => {
  return (
    <section id="company" className={styles.heroSection}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                We view every project as a partnership, where our passion for{' '}
                <span className={styles.highlight}>innovation</span> meets our clients' drive for progress, creating transformative results together.
              </h1>

              <div className={styles.ctaContainer}>
                <a href="#contact" className={styles.ctaButton}>
                  Let's Collaborate
                  <ArrowUpRight size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
