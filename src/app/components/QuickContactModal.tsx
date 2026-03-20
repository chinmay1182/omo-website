"use client"
import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Send, X, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './QuickContactModal.module.css';
import TranslatedText from './TranslatedText';
import { emailService } from '../services/emailService';
import { trackContactForm } from './Analytics';

interface QuickContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickContactModal: React.FC<QuickContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const success = await emailService.sendContactForm({
        fullName: formData.name,
        companyEmail: formData.email,
        companyName: 'Quick Contact',
        projectDescription: formData.message
      });

      if (success) {
        setSubmitStatus('success');
        trackContactForm('quick_contact_modal');
        toast.success('Your message has been sent to support@omodigital.io.');

        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', message: '' });
          setSubmitStatus('idle');
          onClose();
        }, 2000);
      } else {
        setSubmitStatus('error');
        toast.error('We could not send your message right now. Please try again.');
      }
    } catch (error) {
      console.error('Quick contact form error:', error);
      setSubmitStatus('error');
      toast.error('Something went wrong while sending your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const whatsappNumber = '918808022200'; // Your WhatsApp number

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <TranslatedText text="Get In Touch" />
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.contentWrapper}>
            {/* Left Section - WhatsApp Contact */}
            <div className={styles.leftSection}>
              <div className={styles.whatsappCard}>
                <div className={styles.whatsappIconWrapper}>
                  <MessageCircle size={48} className={styles.whatsappIcon} />
                </div>
                <h3 className={styles.whatsappHeading}>
                  <TranslatedText text="Quick Chat on WhatsApp" />
                </h3>
                <p className={styles.whatsappDesc}>
                  <TranslatedText text="Get instant support from our team. We're available 24/7 for your inquiries." />
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hi, I would like to know more about your services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappBtn}
                >
                  <MessageCircle size={18} />
                  <TranslatedText text="Chat on WhatsApp" />
                </a>
                <div className={styles.features}>
                  <div className={styles.feature}>
                    <span className={styles.featureDot}>✓</span>
                    <TranslatedText text="Instant Response" />
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureDot}>✓</span>
                    <TranslatedText text="24/7 Available" />
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureDot}>✓</span>
                    <TranslatedText text="Direct Contact" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className={styles.rightSection}>
              <p className={styles.subtitle}>
                <TranslatedText text="Send us your inquiry details and we'll get back to you soon!" />
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <TranslatedText text="Your Name" />
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <TranslatedText text="Email Address" />
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <TranslatedText text="Phone Number" />
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <TranslatedText text="Your Inquiry" />
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={styles.textarea}
                    rows={4}
                    required
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className={styles.successMessage}>
                    <CheckCircle2 size={18} />
                    <TranslatedText text="Inquiry sent successfully! We'll get back to you soon." />
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className={styles.errorMessage}>
                    <AlertCircle size={18} />
                    <TranslatedText text="Message delivery is not configured yet. Please call or WhatsApp us directly." />
                  </div>
                )}

                <div className={styles.actions}>
                  <button
                    type="button"
                    onClick={onClose}
                    className={styles.cancelBtn}
                  >
                    <TranslatedText text="Cancel" />
                  </button>
                  <button
                    type="submit"
                    className={styles.sendBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className={styles.spinner}>⟳</span>
                        <TranslatedText text="Sending..." />
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <TranslatedText text="Send Inquiry" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickContactModal;
