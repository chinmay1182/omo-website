'use client';

import React, { useState } from 'react';
import { ChevronDown, Mail, Menu, Search } from 'lucide-react';
import Image from 'next/image';
import styles from '../Navbar.module.css';
import TranslatedText from './TranslatedText';
import SearchModal from './SearchModal';
import MobileNav from './MobileNav';
import QuickContactModal from './QuickContactModal';

export default function Navbar() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isQuickContactOpen, setIsQuickContactOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  React.useEffect(() => {
    const handleQuickContact = () => {
      setIsQuickContactOpen(true);
    };

    window.addEventListener('openQuickContact', handleQuickContact);
    return () => window.removeEventListener('openQuickContact', handleQuickContact);
  }, []);

  return (
    <>
      <header className={styles.headerSection}>
        <div className="container-fluid px-4">
          <nav className="navbar navbar-expand-lg p-0">
            <a className="navbar-brand" href="#home" aria-label="Go to home section">
              <Image
                src="/logo2.jpg"
                alt="Logo"
                width={55}
                height={55}
              />
            </a>

            {/* Mobile Menu Button */}
            <button
              className={`d-lg-none ${styles.mobileMenuBtn}`}
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu size={24} />
            </button>

            {/* Navigation Links - Center */}
            <div className={`${styles.navCenter} mx-auto`}>
              <div className={`navbar-nav d-flex flex-row align-items-center ${styles.navbarNav}`}>
                <a className={`nav-link ${styles.navLink} ${styles.activeLink}`} href="#home">
                  <TranslatedText text="home" />
                </a>
                <a className={`nav-link ${styles.navLink}`} href="#services">
                  <TranslatedText text="solutions" />
                </a>
                <div
                  className={styles.productsDropdown}
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  <button
                    type="button"
                    className={`${styles.navLink} ${styles.productsTrigger}`}
                    onClick={() => setIsProductsOpen((prev) => !prev)}
                    aria-expanded={isProductsOpen}
                    aria-haspopup="menu"
                  >
                    <span>our products</span>
                    <span className={styles.newBadge}>NEW</span>
                    <ChevronDown className={`${styles.dropdownChevron} ${isProductsOpen ? styles.dropdownChevronOpen : ''}`} size={14} />
                  </button>
                  {isProductsOpen && (
                    <div className={styles.productsMenu} role="menu">
                      <a
                        href="https://crm.omodigital.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.productMenuItem}
                        role="menuitem"
                      >
                        <span className={styles.productMenuTitle}>OMO CRM</span>
                        <span className={styles.productMenuDescription}>
                          Manage leads, follow-ups, and customer conversations in one place.
                        </span>
                        <span className={styles.productMenuMeta}>Launch CRM workspace</span>
                      </a>
                    </div>
                  )}
                </div>
                <a className={`nav-link ${styles.navLink}`} href="#company">
                  <TranslatedText text="company" />
                </a>
                <a className={`nav-link ${styles.navLink}`} href="#testimonials">
                  <TranslatedText text="testimonials" />
                </a>
                <a className={`nav-link ${styles.navLink}`} href="#blog"><TranslatedText text="blog" /></a>
                <a className={`nav-link ${styles.navLink}`} href="#contact"><TranslatedText text="contact" /></a>
              </div>
            </div>

            {/* Client Support & Contact - Right */}
            <div className={`d-flex align-items-center ${styles.rightSection}`}>
              <div className={styles.clientSupport}>
                <span className={styles.supportText}>
                  <TranslatedText text="client support" />
                </span>
                <a href="tel:+918808022200" className={styles.phoneNumber}>+91 88080 22200</a>
              </div>
              <button
                className={`ms-3 ${styles.contactBtn}`}
                onClick={() => setIsQuickContactOpen(true)}
              >
                <TranslatedText text="Contact Us" />
              </button>

              <div className={styles.iconSection}>
                <Search className={styles.gradientIcon} onClick={() => setIsSearchModalOpen(true)} aria-label="Search" />
                <Mail className={styles.gradientIcon} onClick={() => setIsQuickContactOpen(true)} aria-label="Quick Contact" />
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      {/* Quick Contact Modal */}
      <QuickContactModal
        isOpen={isQuickContactOpen}
        onClose={() => setIsQuickContactOpen(false)}
      />

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
