import type { Metadata } from 'next';
import React, { JSX } from 'react';
import styles from './layout.module.css';
import { ThemeProvider } from '@/components/providers/theme-provider';

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
      <body className={styles.layout}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="">
            <div className="min-h-[calc(100vh-192px)] boundary py-8">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
