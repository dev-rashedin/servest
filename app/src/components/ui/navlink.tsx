'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navItems } from '@/data/constant';

export default function NavLink() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <ul className="flex gap-8">
      {navItems.map(({ label, to }, index) => {
        const isActive = pathname === to;
        const isHovered = hoveredIndex === index;

        return (
          <li key={to} className="relative py-1">
            <Link
              href={to}
              className={`
                relative px-2 py-1 font-medium tracking-wide flex items-center transition-all duration-300
                ${
                  isActive ? 'text-brand font-semibold' : 'text-foreground/80 hover:text-foreground'
                }
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Label with conditional scaling */}
              <span className={`transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}>
                {label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand rounded-full" />
              )}

              {/* Hover indicator */}
              <span
                className={`
                  absolute bottom-0 left-1/2 h-0.5 bg-brand/60 rounded-full transition-all duration-300 ease-out
                  ${isHovered ? 'w-full left-0' : 'w-0'}
                `}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
