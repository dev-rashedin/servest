'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from '../theme/theme-switcher';
import Socials from './socials';
import { IoCloseCircleOutline, RiMenu3Fill, navItems } from '@/data';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        className="md:hidden flex items-center justify-center p-2"
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

      {/* Overlay + Menu */}
      {isOpen && (
        <div
          className="fixed top-20 inset-0 z-40 bg-docs transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <ul
        className={`md:hidden w-[90vw] rounded-md px-12 py-8 space-y-6 flex flex-col absolute top-16 right-0
        transform ${isOpen ? 'transition-all duration-500 ease-in-out' : ''} z-50
        ${isOpen ? 'opacity-100 translate-y-0' : '-translate-y-5 opacity-0 pointer-events-none'}
        `}
      >
        {navItems.map((link) => {
          const isActive = pathname === link.to;
          return !link.dropdown ? (
            <li key={link.label}>
              <Link
                href={link.to}
                className={`block font-medium tracking-wide px-2 py-1 rounded transition-colors duration-300 border-b pb-2 
                ${isActive ? 'text-brand font-medium' : ''}
              `}
              >
                {link.label}
              </Link>
            </li>
          ) : (
            ''
          );
        })}

        <div className="w-full mx-auto border rounded-lg flex-between py-2 px-8 justify-end">
          <span className="text-xs text-muted-foreground opacity-75">Theme</span>
          <ThemeSwitcher />
        </div>

        <div className="pt-4">
          <Socials screenType="small" />
        </div>
      </ul>
    </div>
  );
}
