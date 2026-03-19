"use client"
import React from 'react';
import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppFloat.module.css';
import { trackWhatsAppClick } from './Analytics';

const WhatsAppFloat: React.FC = () => {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
    const phoneNumber = '918808022200';
    const message = 'Hello! I would like to know more about your services.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={styles.whatsappFloat} onClick={handleWhatsAppClick}>
      <div className={styles.whatsappIcon}>
        <MessageCircle size={30} strokeWidth={2.2} />
      </div>
      <span className={styles.tooltip}>Chat with us on WhatsApp</span>
    </div>
  );
};

export default WhatsAppFloat;
