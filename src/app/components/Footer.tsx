"use client"
import React, { useState } from 'react';
import styles from '../Footer.module.css';
import Image from 'next/image';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { emailService } from '../services/emailService';

const Footer: React.FC = () => {
  const solutionLinks = [
    { label: 'Mobile Development', href: '/#services' },
    { label: 'IT Consulting & Advisory', href: '/#services' },
    { label: 'Deployment Services', href: '/#services' },
    { label: 'UI/UX Design', href: '/#services' },
    { label: 'Managed Services', href: '/#services' },
    { label: 'Web Development', href: '/#services' },
    { label: 'AI/ML & Blockchain', href: '/#services' },
    { label: 'Brand Management', href: '/#services' },
  ];

  const companyLinks = [
    { label: 'OMO CRM', href: 'https://crm.omodigital.io/', external: true },
    { label: 'Quick Contact', href: '/#contact' },
  ];

  const comingSoonLinks = [
    { label: 'GovTech', href: '#', disabled: true },
  ];

  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChecked || !email) {
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    const success = await emailService.subscribeNewsletter({ email });
    setStatus(success ? 'success' : 'error');

    if (success) {
      setEmail('');
      setIsChecked(false);
      toast.success('Subscription received. We will reach out on support@omodigital.io.');
    } else {
      toast.error('We could not save your subscription right now. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h3 className={styles.columnTitle}>Solutions</h3>
            <div className={styles.linksSection}>

              <div className={styles.column}>
                <ul className={styles.linkList}>
                  {solutionLinks.slice(0, 4).map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={styles.link}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.column}>
                <ul className={styles.linkList}>
                  {solutionLinks.slice(4).map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={styles.link}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h3 className={styles.columnTitle}>Company</h3>
            <div className={styles.linksSection}>
              <div className={styles.column}>
                <ul className={styles.linkList}>
                  {companyLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={styles.link}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h3 className={styles.columnTitle}>Coming Soon</h3>
            <div className={styles.linksSection}>
              <div className={styles.column}>
                <ul className={styles.linkList}>
                  {comingSoonLinks.map((link) => (
                    <li key={link.label} style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                      <span className={styles.link} style={{ pointerEvents: 'none' }}>
                        {link.label}
                        <span className={styles.comingSoonBadge}>Coming Soon</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.subscriptionSection}>
              <h4 className={styles.subscriptionTitle}>Don't miss out any updates</h4>
              <form onSubmit={handleSubmit} className={styles.subscriptionForm}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.emailInput}
                  required
                />
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <label htmlFor="privacyConsent" className={styles.checkboxLabel}>
                    I agree to the <a href="/privacy-policy" className={styles.link}>Privacy Policy</a> and give my
                    permission to process my personal data for the purposes specified there.
                  </label>
                </div>
                <button
                  type="submit"
                  className={styles.sendButton}
                  disabled={!isChecked || !email || isSubmitting}
                >
                  <Send size={16} />
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
                {status === 'success' && (
                  <p className={styles.formMessage}>Thanks for subscribing. We will keep you posted.</p>
                )}
                {status === 'error' && (
                  <p className={styles.formMessageError}>Newsletter delivery is not configured yet. Please contact us directly.</p>
                )}
              </form>
            </div>
          </div>

          <div className={styles.rightSection}>


            <div className={styles.logoSection}>
              <div className={styles.logo}>

                <Image
                  src="/footerlogo.jpg"
                  alt="OMO Digital footer artwork"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={false}
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
