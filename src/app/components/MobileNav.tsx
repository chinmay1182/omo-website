"use client"
import React, { useEffect } from 'react';
import { Mail, X } from 'lucide-react';
import styles from './MobileNav.module.css';
import TranslatedText from './TranslatedText';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Menu</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <nav className={styles.nav}>
          <a href="#home" className={styles.navLink} onClick={onClose}>
            <TranslatedText text="home" />
          </a>
          <a href="#services" className={styles.navLink} onClick={onClose}>
            <TranslatedText text="solutions" />
          </a>
          <a
            href="https://crm.omodigital.io/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.navLink} ${styles.productNavLink}`}
            onClick={onClose}
          >
            <span>our products</span>
            <span className={styles.newBadge}>NEW</span>
          </a>
          <a
            href="https://crm.omodigital.io/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.subNavLink}
            onClick={onClose}
          >
            OMO CRM
          </a>
          <a href="#company" className={styles.navLink} onClick={onClose}>
            <TranslatedText text="company" />
          </a>
          <a href="#testimonials" className={styles.navLink} onClick={onClose}>
            <TranslatedText text="testimonials" />
          </a>
          <a href="#blog" className={styles.navLink} onClick={onClose}>
            <TranslatedText text="blog" />
          </a>
          <a href="#contact" className={styles.navLink} onClick={onClose}>
            <TranslatedText text="contact" />
          </a>
        </nav>

        <div className={styles.actions}>
          <div className={styles.contact}>
            <div className={styles.supportInfo}>
              <span className={styles.supportLabel}>
                <TranslatedText text="client support" />
              </span>
              <a href="tel:+918808022200" className={styles.phoneNumber}>
                +91 88080 22200
              </a>
            </div>
            
            <button 
              className={styles.quickContactBtn}
              onClick={() => {
                onClose();
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('openQuickContact'));
                }
              }}
            >
              <Mail size={18} />
              <TranslatedText text="Quick Contact" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
