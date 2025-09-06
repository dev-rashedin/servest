'use client';
import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';

export default function MotionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex-1 overflow-y-auto px-36 pt-16 bg-gray-900"
    >
      {children}
    </motion.main>
  );
}
