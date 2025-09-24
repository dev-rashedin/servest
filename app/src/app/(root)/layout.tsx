import React, { JSX } from 'react';
import { Spotlight } from '@/components/ui/spotlight-new';
import Navbar from '@/components/Navbar';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <main className="relative">
      <Spotlight
        className="absolute -top-40 -left-20 sm:-top-40 sm:left-0 md:-top-20 md:left-60 opacity-70 sm:opacity-80 md:opacity-100"
        fill="white"
      />
      <Navbar type="home" />
      {children}
    </main>
  );
}
