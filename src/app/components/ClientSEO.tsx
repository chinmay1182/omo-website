"use client"
import { useEffect } from 'react';

const ClientSEO: React.FC = () => {
  useEffect(() => {
    document.documentElement.lang = 'en';

    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    updateMetaTag('og:locale', 'en_US');

    const updateLinkTag = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]`;
      let link = document.querySelector(selector) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        if (hreflang) {
          link.hreflang = hreflang;
        }
        document.head.appendChild(link);
      }
      link.href = href;
    };

    const baseUrl = 'https://omodigital.io';
    updateLinkTag('canonical', baseUrl);
    updateLinkTag('alternate', baseUrl, 'en');
    updateLinkTag('alternate', baseUrl, 'x-default');
  }, []);

  return null;
};

export default ClientSEO;
