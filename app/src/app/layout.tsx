import type { Metadata } from 'next';
import React, { JSX } from 'react';
import { Inter, Merriweather, Montserrat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';

const merriweather = Merriweather({ subsets: ['latin'], weight: ['300', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Servest – The Ultimate Backend Starter & Addon Toolkit',
  description:
    'Servest is an open-source monorepo to create ready-made backend templates for Express, Django, Laravel, Fastify and more. It also allows you to add features like ESLint, Prettier, Mongoose, Prisma and more with a single click.',
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
      className={`${merriweather.className} ${montserrat.className} ${inter.className} font-body text-body antialiased [scrollbar-gutter:stable]`}
    >
      <body className="relative overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
