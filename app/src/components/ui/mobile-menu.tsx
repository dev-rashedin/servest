'use client';

import { useEffect, useState } from 'react';
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

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu-container')) {
        setIsOpen(false);
      }
    };

    // Close the menu when navigating
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [isOpen, pathname]);

  return (
    <div className="relative mobile-menu-container">
      {/* Backdrop for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <button
        className="md:hidden flex items-center justify-center p-2 relative z-50 hover:bg-background/50 rounded-full transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`transform transition-all duration-300 ${
            isOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
          }`}
        >
          {isOpen ? (
            <IoCloseCircleOutline size={27} className="text-brand" />
          ) : (
            <RiMenu3Fill size={24} />
          )}
        </span>
      </button>

      <div
        className={`
          md:hidden bg-background/95 backdrop-blur-md shadow-lg rounded-xl py-4 sm:py-6 space-y-2 sm:space-y-3
          flex flex-col absolute top-12 sm:top-14 right-0 w-56 sm:w-64 z-50
          border border-border/20 overflow-hidden
          transform transition-all duration-300 ease-out
          ${isOpen ? 'opacity-100 translate-y-0' : 'translate-y-5 opacity-0 pointer-events-none'}
        `}
      >
        <div className="px-4 pb-2 border-b border-border/10">
          <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">
            Navigation
          </h3>
        </div>

        <div className="px-2 space-y-1">
          {navItems.map(({ label, to }, index) => {
            const isActive = pathname === to;
            return (
              <Link
                key={to}
                href={to}
                onClick={() => setIsOpen(false)}
                className={`
                  block font-medium text-base px-4 py-2.5 rounded-lg transition-all duration-300
                  hover:bg-brand/10 relative overflow-hidden group
                  ${isActive ? 'text-brand font-medium bg-brand/5' : 'text-foreground/80'}
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">{label}</span>
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-brand rounded-r-full" />
                )}
                <span className="absolute bottom-0 left-0 h-[2px] bg-brand/40 w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            );
          })}
        </div>

        <div className="border-t border-border/10 pt-3 mt-2 px-4">
          <div className="w-full mx-auto flex-between py-2">
            <span className="text-sm text-foreground/70 font-medium">Theme</span>
            <ThemeSwitcher />
          </div>
        </div>

        <div className="px-4 pt-2 border-t border-border/10">
          <div className="flex-center gap-3 justify-center pt-2">
            <Socials screenType="small" />
          </div>
        </div>
      </div>
    </div>
  );
}
