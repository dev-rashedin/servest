import type { Metadata } from 'next';
import React, { JSX } from 'react';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/theme/theme-provider';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'Servest | Backend Starter & Addon Toolkit',
    template: '%s | Servest',
  },

  description:
    'Servest is an open-source backend starter and addon toolkit that helps developers generate production-ready templates for Express, Fastify, Django, Laravel, and more.',

  metadataBase: new URL('https://servest.dev'),

  authors: [{ name: 'Rashedin Islam' }],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: 'https://servest.dev',
  },

  openGraph: {
    title: 'Servest | Backend Starter & Addon Toolkit',

    description:
      'Generate production-ready backend templates and install addons like Prisma, Mongoose, ESLint, and Prettier in seconds.',

    url: 'https://servest.dev',

    siteName: 'Servest',

    locale: 'en_US',

    images: [
      {
        url: '/images/servest-og.png',
        width: 1200,
        height: 630,
        alt: 'Servest Backend Starter Toolkit',
      },
    ],

    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Servest | Backend Starter & Addon Toolkit',

    description:
      'Generate backend templates and addons for Express, Fastify, Django, Laravel and more.',

    images: ['/images/servest-og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.className} ${inter.className} font-body text-body antialiased [scrollbar-gutter:stable]`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'SoftwareApplication',
                  '@id': 'https://servest.dev/#app',

                  name: 'Servest',

                  url: 'https://servest.dev',

                  description:
                    'Open-source backend starter and addon toolkit for Express, Fastify, Django, Laravel and other backend frameworks.',

                  applicationCategory: 'DeveloperApplication',

                  operatingSystem: 'Cross-platform',

                  offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                  },

                  author: {
                    '@id': 'https://servest.dev/#person',
                  },
                },

                {
                  '@type': 'Person',

                  '@id': 'https://servest.dev/#person',

                  name: 'Rashedin Islam',

                  url: 'https://rashedin.dev',
                },

                {
                  '@type': 'WebSite',

                  '@id': 'https://servest.dev/#website',

                  url: 'https://servest.dev',

                  name: 'Servest',
                },
              ],
            }),
          }}
        />
        <meta
          name="google-site-verification"
          content="rXuGd6piozPg3OsqUwmEgfymqQDbG9b16yMJDwqOGl8"
        />
      </head>
      <body className="relative overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
