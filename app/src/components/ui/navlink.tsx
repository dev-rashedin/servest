'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import AnimatedBorder from './AnimatedBorder';
import { IoIosArrowDown, IoIosArrowUp, navItems } from '@/data';

export default function NavLink() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <ul className="hidden md:flex gap-8">
      {navItems.map((link) => {
        const isActive = pathname === link.to;
        return link.dropdown ? (
          <li
            key={link.label}
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => {
              setTimeout(() => setOpen(false), 300);
            }}
          >
            <button className="transition -mr-1 flex-center">
              {link.label}
              <span className="ml-2">{open ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </button>

            {open && (
              <div className="absolute -left-8 top-full bg-card shadow-lg rounded-xl w-48 z-50 p-4">
                {link.dropdown.map((sub) => (
                  <Link
                    key={sub.to}
                    href={sub.to}
                    className={`group px-[2px] relative rounded-full cursor-pointer tracking-wide flex gap-2 items-center xl:text-lg
                ${isActive ? 'text-brand font-medium' : ''}`}
                  >
                    <span className="relative group">
                      {sub.label}
                      <AnimatedBorder />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </li>
        ) : (
          <li key={link.label}>
            <Link
              href={link.to}
              className={`
                group px-[2px] relative rounded-full cursor-pointer tracking-wide flex gap-2 items-center xl:text-lg
                ${isActive ? 'text-brand font-medium' : ''}
              `}
            >
              {link.label}
              <AnimatedBorder />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
