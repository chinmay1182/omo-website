"use client";

import React from 'react';
import Image from 'next/image';
import styles from '../LastFooter.module.css';
import { ArrowUp, ChevronRight } from 'lucide-react';

const LastFooter: React.FC = () => {
    const socialLinks = [
        {
            href: 'https://www.facebook.com/',
            label: 'Facebook',
            iconSrc: 'https://img.icons8.com/ios/50/facebook-new.png',
        },
        {
            href: 'https://x.com/omodigital_io',
            label: 'X',
            iconSrc: 'https://img.icons8.com/ios/50/twitterx--v1.png',
        },
        {
            href: 'https://www.instagram.com/omodigital.io/',
            label: 'Instagram',
            iconSrc: 'https://img.icons8.com/ios/50/instagram-new--v1.png',
        },
        {
            href: 'https://www.linkedin.com/company/omodigital/?viewAsMember=true',
            label: 'LinkedIn',
            iconSrc: 'https://img.icons8.com/ios/50/linkedin.png',
        },
    ];

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.socialSection}>
                    <span className={styles.followText}>Follow us on</span>
                    <div className={styles.arrow}>
                        <ChevronRight size={18} />
                    </div>
                    <div className={styles.socialIcons}>
                        {socialLinks.map(({ href, label, iconSrc }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label={label}>
                                <Image src={iconSrc} alt={label} width={24} height={24} unoptimized />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Horizontal Line */}
                <div className={styles.divider}></div>

                {/* Main Heading */}
                <div className={styles.mainContent}>
                    <h1 className={styles.mainHeading}>We are looking for a challenge.</h1>
                </div>

                {/* Footer Links */}
                <div className={styles.footerLinks}>
                    <a href="/privacy-policy" className={styles.footerLink}>Privacy Policy</a>
                    <a href="/terms-of-service" className={styles.footerLink}>Terms of service</a>
                    <a href="/refund-policy" className={styles.footerLink}>Refund Policy</a>
                    <a href="/acceptable-use-policy" className={styles.footerLink}>Acceptable user policy</a>

                    {/* Scroll to Top Button */}
                    <button className={styles.scrollToTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top">
                        <ArrowUp size={16} />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default LastFooter;
