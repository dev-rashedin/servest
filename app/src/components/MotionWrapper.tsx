'use client';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import Navbar from './Navbar';
import SecondaryNav from './ui/secondary-nav';

export default function MotionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <main>
      {pathname.includes('config') || pathname === '/config' ? null : <Navbar type="sidebar" />}
      <SecondaryNav pathname={pathname} />
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="flex-1 overflow-y-auto px-6 md:px-12 lg:px-20 xl:px-28 pt-16 "
      >
        {children}
      </motion.div>
    </main>
  );
}
