'use client';
import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import DocsNav from './DocsNav';

export default function MotionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <main>
      {pathname.includes('config') || pathname === '/config' ? null : <DocsNav />}
      {/* <div className="flex-1 overflow-y-auto px-6 md:px-12 pt-16 "> {children}</div> */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.1, ease: 'easeInOut' }}
        className="flex-1 overflow-y-auto px-6 md:px-12 pt-16 "
      >
        {children}
      </motion.div>
    </main>
  );
}
