/**
 * Central content configuration for the website
 * Single source of truth for services, blog posts, and pages
 */

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  image: string;
  content?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category?: string;
}

export interface WebPage {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'section';
}

// ============ SERVICES ============
export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Development Services',
    description: 'Custom web development solutions using modern technologies like Next.js, React, and Node.js. Build fast, scalable, and user-friendly web applications.',
    category: 'development'
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile app development for iOS and Android. Create powerful mobile experiences with React Native and native technologies.',
    category: 'development'
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'User-centered design and interface design services. Create beautiful, intuitive, and conversion-ready digital experiences.',
    category: 'design'
  },
  {
    id: 'cloud-migration',
    title: 'Cloud Migration',
    description: 'Enterprise cloud solutions and migration services. Move to AWS, Azure, or GCP with minimum downtime and maximum efficiency.',
    category: 'infrastructure'
  },
  {
    id: 'ai-ml-blockchain',
    title: 'AI/ML & Blockchain',
    description: 'Artificial intelligence, machine learning, and blockchain solutions. Leverage cutting-edge technology for innovation.',
    category: 'innovation'
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting & Advisory',
    description: 'Strategic IT consulting and technology advisory services. Get expert guidance on digital transformation and technology strategy.',
    category: 'consulting'
  },
  {
    id: 'managed-services',
    title: 'Managed Services',
    description: 'Managed IT services and support for your infrastructure. Keep your systems running 24/7 with expert monitoring and maintenance.',
    category: 'support'
  },
  {
    id: 'brand-management',
    title: 'Brand Management',
    description: 'Digital branding and brand management solutions. Build consistent, memorable brands across all digital touchpoints.',
    category: 'marketing'
  }
];

// ============ BLOG POSTS ============
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How Modern Websites Turn Attention Into Qualified Leads',
    excerpt: 'A high-performing website is more than design. It needs clarity, trust signals, strong messaging, and friction-free enquiry flows that help businesses convert visitors into real conversations.',
    author: 'OMO Digital Team',
    image: '/blogs/image6.jpg',
    content: 'Modern websites must balance aesthetics with functionality to convert visitors into leads...'
  },
  {
    id: 'blog-2',
    title: 'Why Fast, Scalable Web Development Matters for Growing Brands',
    excerpt: 'As your business grows, your digital stack should keep up. We focus on performance, maintainability, and scalable architecture so teams can launch faster and improve with confidence.',
    author: 'OMO Digital Team',
    image: '/blogs/image7.jpg',
    content: 'Scalability is not an afterthought. It should be built into your architecture from day one...'
  },
  {
    id: 'blog-3',
    title: 'Design Systems That Keep Products Consistent and Conversion-Ready',
    excerpt: 'From landing pages to product dashboards, a strong design system helps brands move faster, stay consistent, and deliver a cleaner user experience at every touchpoint.',
    author: 'OMO Digital Team',
    image: '/blogs/image8.jpg',
    content: 'A design system is the foundation of consistent brand experience across products...'
  },
  {
    id: 'blog-4',
    title: 'What Businesses Should Expect From a Reliable Digital Partner',
    excerpt: 'Delivery should not stop at launch. The right partner brings communication, iteration, technical ownership, and long-term support so digital investments keep creating business value.',
    author: 'OMO Digital Team',
    image: '/blogs/image10.jpg',
    content: 'The best partnerships extend beyond project delivery to long-term success...'
  },
  {
    id: 'blog-5',
    title: 'Why CRM and Internal Tools Are Becoming Growth Essentials',
    excerpt: 'Custom internal tools and CRM workflows help teams manage leads, follow-ups, service delivery, and reporting in one place, reducing chaos and improving response quality.',
    author: 'OMO Digital Team',
    image: '/blogs/image9.jpg',
    content: 'Internal tools are no longer nice-to-have. They are essential for operational excellence...'
  }
];

// ============ PAGES & SECTIONS ============
export const PAGES: WebPage[] = [
  {
    id: 'home',
    title: 'Home',
    description: 'Welcome to OMO Digital. We build beautiful, scalable digital products that drive business growth.',
    url: '/',
    type: 'page'
  },
  {
    id: 'services',
    title: 'Our Services',
    description: 'Explore our comprehensive range of digital services including web development, design, consulting, and more.',
    url: '/#services',
    type: 'section'
  },
  {
    id: 'testimonials',
    title: 'Client Stories',
    description: 'See how our clients are using design and technology to grow their businesses.',
    url: '/#testimonials',
    type: 'section'
  },
  {
    id: 'about',
    title: 'About OMO Digital',
    description: 'Learn about OMO Digital, our mission, team, and approach to digital transformation.',
    url: '/#company',
    type: 'section'
  },
  {
    id: 'blog',
    title: 'Blog & Articles',
    description: 'Browse our latest insights on technology, design, and digital transformation.',
    url: '/#blog',
    type: 'section'
  },
  {
    id: 'contact',
    title: 'Get In Touch',
    description: 'Ready to start your digital transformation? Get in touch with our team for a quick consultation.',
    url: '/#contact',
    type: 'section'
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    description: 'Our privacy policy outlines how we collect, use, and protect your personal information.',
    url: '/privacy-policy',
    type: 'page'
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    description: 'Our terms of service govern your use of the OMO Digital website and services.',
    url: '/terms-of-service',
    type: 'page'
  },
  {
    id: 'refund',
    title: 'Refund Policy',
    description: 'Learn about our refund and cancellation policies for our services.',
    url: '/refund-policy',
    type: 'page'
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable Use Policy',
    description: 'Guidelines for acceptable use of OMO Digital services and platform.',
    url: '/acceptable-use-policy',
    type: 'page'
  }
];

// ============ CRM PRODUCT ============
export const PRODUCTS = [
  {
    id: 'omo-crm',
    title: 'OMO CRM',
    description: 'Manage leads, follow-ups, and customer conversations in one unified platform. Streamline your sales process and improve team productivity.',
    url: 'https://crm.omodigital.io/',
    type: 'service'
  }
];
