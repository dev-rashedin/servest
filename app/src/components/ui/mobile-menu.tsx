'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGithub } from 'react-icons/fi';
import { navItems } from '@/lib/constant';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        className="md:hidden flex items-center justify-center p-2 text-white hover:text-yellow-sunshine"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="md:hidden bg-dark-blue text-white px-4 pt-2 pb-4 space-y-2">
          {navItems.map(({ label, to }) => {
            const isActive = pathname === to;
            return (
              <Link
                key={to}
                href={to}
                className={`block font-body font-medium tracking-wide px-2 py-1 rounded
                  ${isActive ? 'text-yellow-sunshine' : 'text-white'}
                  hover:text-yellow-dusk
                `}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            );
          })}

          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-white hover:text-yellow-dusk"
          >
            <FiGithub size={20} /> GitHub
          </a>
        </div>
      )}
    </>
  );
}
