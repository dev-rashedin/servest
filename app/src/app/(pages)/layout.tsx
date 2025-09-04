'use client';

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname} // triggers animation on route change
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="wall py-8 overflow-x-hidden"
    >
      {children}
    </motion.div>
  );
}
