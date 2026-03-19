"use client"
import React from 'react';

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Service' | 'Article' | 'BreadcrumbList';
  data: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const generateStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    };

    switch (type) {
      case 'Organization':
        return {
          ...baseData,
          name: data.name || 'OMO Digital',
          url: data.url || 'https://omodigital.io',
          logo: data.logo || 'https://omodigital.io/logo2.jpg',
          description: data.description || 'Leading digital transformation company',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-88080-22200',
            contactType: 'customer service',
            availableLanguage: ['English']
          },
          sameAs: data.sameAs || [
            'https://www.linkedin.com/company/omodigital/?viewAsMember=true',
            'https://www.instagram.com/omodigital.io/',
            'https://x.com/omodigital_io'
          ],
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'IN'
          }
        };

      case 'WebSite':
        return {
          ...baseData,
          name: data.name || 'OMO Digital',
          url: data.url || 'https://omodigital.io',
        };

      case 'Service':
        return {
          ...baseData,
          serviceType: data.serviceType,
          provider: {
            '@type': 'Organization',
            name: 'OMO Digital'
          },
          areaServed: data.areaServed || 'Worldwide',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Digital Services',
            itemListElement: data.services || []
          }
        };

      case 'Article':
        return {
          ...baseData,
          headline: data.headline,
          author: {
            '@type': 'Organization',
            name: 'OMO Digital'
          },
          publisher: {
            '@type': 'Organization',
            name: 'OMO Digital',
            logo: {
              '@type': 'ImageObject',
              url: 'https://omodigital.io/logo2.jpg'
            }
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished,
          image: data.image,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url
          }
        };

      case 'BreadcrumbList':
        return {
          ...baseData,
          itemListElement: data.items.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
          }))
        };

      default:
        return baseData;
    }
  };

  const structuredData = generateStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
};

export default StructuredData;
