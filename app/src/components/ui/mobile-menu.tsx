'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiMenu3Fill } from 'react-icons/ri';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { ThemeSwitcher } from '../theme/theme-switcher';
import Socials from './socials';
import { navItems } from '@/data/constant';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative">
      <button
        className="md:hidden flex items-center justify-center p-2 "
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
          }`}
        >
          {isOpen ? <IoCloseCircleOutline size={27} /> : <RiMenu3Fill size={24} />}
        </span>
      </button>

      <div
        className={`md:hidden bg-[rgb(var(--footer-bg))] w-[90vw] rounded-md px-20 py-8 space-y-4 flex flex-col absolute top-16 right-0
        transform transition-all duration-300 ease-in-out pl-4 z-50
        ${isOpen ? 'opacity-100 translate-y-0' : 'translate-y-5 opacity-0 pointer-events-none'}
        `}
      >
        {navItems.map(({ label, to }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              href={to}
              className={`block font-medium tracking-wide px-2 py-1 rounded transition-colors duration-300 border-b pb-2 
                ${isActive ? 'text-brand font-medium' : ''}
              `}
            >
              {label}
            </Link>
          );
        })}

        <div className="w-full mx-auto border rounded-lg flex-between py-2 px-4 justify-end">
          <span className="text-xs text-muted-foreground opacity-75">Theme</span>
          <ThemeSwitcher />
        </div>

        <div className="pt-4">
          <Socials screenType="small" />
        </div>
      </div>
    </div>
  );
}
