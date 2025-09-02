import type { Metadata } from 'next';
import React, { JSX } from 'react';
import { Merriweather, Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ThemeProvider } from '@/components/providers/theme-provider';

const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${merriweather.className} ${montserrat.className} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="">
            <Navbar />

            <div className="min-h-[calc(100vh-160px)] boundary py-8">{children}</div>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
