"use client"
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const Analytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Google Analytics
    if (process.env.NEXT_PUBLIC_GA_ID && typeof window !== 'undefined') {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
          page_title: document.title,
          page_location: window.location.href,
        });
      `;
      document.head.appendChild(script2);
    }
  }, []);

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && window.gtag) {
      const queryString = searchParams.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
};

// Custom event tracking functions
export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackContactForm = (formType: string) => {
  trackEvent('contact_form_submit', {
    form_type: formType,
    event_category: 'engagement',
    event_label: 'Contact Form'
  });
};

export const trackNewsletterSignup = () => {
  trackEvent('newsletter_signup', {
    event_category: 'engagement',
    event_label: 'Newsletter'
  });
};

export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: 'WhatsApp Float'
  });
};

export const trackSearchQuery = (query: string, resultsCount: number) => {
  trackEvent('search', {
    search_term: query,
    results_count: resultsCount,
    event_category: 'search',
    event_label: 'Site Search'
  });
};

export default Analytics;
