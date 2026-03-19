import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import TitleVisibilityHandler from '../../TitleVisibilityHandler';
import CookieConsent from './components/CookieConsent';
import WhatsAppFloat from './components/WhatsAppFloat';
import ErrorBoundary from './components/ErrorBoundary';
import AnalyticsWrapper from './components/AnalyticsWrapper';
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});


export const metadata: Metadata = {
  metadataBase: new URL('https://omodigital.io'),
  title: 'O M O',
  description: 'Leading digital transformation company specializing in web development, mobile apps, AI/ML, and cloud solutions.',
  keywords: 'web development, mobile apps, AI, machine learning, cloud services, digital transformation, software development',
  authors: [{ name: 'OMO Digital' }],
  creator: 'OMO Digital',
  publisher: 'OMO Digital',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://omodigital.io',
    siteName: 'OMO Digital',
    title: 'O M O',
    description: 'Leading digital transformation company specializing in web development, mobile apps, AI/ML, and cloud solutions.',
    images: [
      {
        url: '/logo2.jpg',
        width: 1200,
        height: 630,
        alt: 'OMO Digital - Code. Create. Celebrate.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'O M O',
    description: 'Leading digital transformation company specializing in web development, mobile apps, AI/ML, and cloud solutions.',
    creator: '@omodigital',
    images: ['/logo2.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/logo.jpg',
    apple: '/logo2.jpg',
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#8b5cf6',
    'msapplication-TileColor': '#8b5cf6',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>
        <ErrorBoundary>
          <AnalyticsWrapper />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#111827',
                color: '#ffffff',
                borderRadius: '14px',
                padding: '14px 16px',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
          <TitleVisibilityHandler />
          <CookieConsent />
          <WhatsAppFloat />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
