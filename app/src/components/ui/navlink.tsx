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
              <ul className="absolute -left-8 top-full bg-docs shadow-lg rounded-xl w-40 flex flex-col gap-3 z-50 px-4 py-8">
                {link.dropdown.map((sub) => (
                  <li key={sub.to}>
                    <Link
                      href={sub.to}
                      className={`group px-[2px] relative rounded-full cursor-pointer tracking-wide flex gap-8 items-center
                ${isActive ? 'text-brand font-medium' : ''}`}
                    >
                      <span className="relative group">
                        {sub.label}
                        <AnimatedBorder />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
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
