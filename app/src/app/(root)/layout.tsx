import React, { JSX } from 'react';
import { Spotlight } from '@/components/ui/spotlight-new';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <main className="relative">
      <Spotlight className="absolute -top-40 left-0 md:-top-20 md:left-60" fill="white" />
      {children}
    </main>
  );
}
