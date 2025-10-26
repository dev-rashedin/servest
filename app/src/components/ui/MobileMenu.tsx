'use client';

import { useState } from 'react';
import { ThemeSwitcher } from '../theme/theme-switcher';
import Socials from './SocialLinks';
import NavLink from './NavLinks';
import { IoCloseCircleOutline, RiMenu3Fill } from '@/data';

export default function MobileMenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        className="md:hidden flex items-center justify-center p-2"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span
          className={`transform transition-transform duration-300 ${
            dropdownOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
          }`}
        >
          {dropdownOpen ? <IoCloseCircleOutline size={27} /> : <RiMenu3Fill size={24} />}
        </span>
      </button>

      {/* Overlay + Menu */}
      {dropdownOpen && (
        <div
          className="fixed top-20 inset-0 z-40 bg-docs transition-opacity duration-300"
          onClick={() => setDropdownOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden w-[90vw] rounded-md px-12 py-8 space-y-6 flex flex-col absolute top-16 right-0
        transform ${dropdownOpen ? 'transition-all duration-500 ease-in-out' : ''} z-50
        ${dropdownOpen ? 'opacity-100 translate-y-0' : '-translate-y-5 opacity-0 pointer-events-none'}
        `}
      >
        {/* {navItems.map((link) => {
          const isActive = pathname === link.to;
          return link.dropdown ? (
            <li
              key={link.label}
              className="relative pl-2 border-b pb-2"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <button className="w-full transition flex justify-between ">
                {link.label}
                <span className="ml-2">{dropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
              </button>

              {dropdownOpen && (
                <ul className=" top-full rounded-xl w-full flex flex-col gap-3 z-50 px-4 py-8 ">
                  {link.dropdown.map((sub) => (
                    <li key={sub.to}>
                      <Link
                        href={sub.to}
                        className={`block font-medium tracking-wide px-2 py-1 rounded transition-colors duration-300
                ${isActive ? 'text-brand font-medium' : ''}
              `}
                      >
                        <span className="relative group">{sub.label}</span>
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
                className={`block font-medium tracking-wide px-2 py-1 rounded transition-colors duration-300 border-b pb-2 
                ${isActive ? 'text-brand font-medium' : ''}
              `}
              >
                {link.label}
              </Link>
            </li>
          );
        })} */}
        <NavLink dropdownOpen={dropdownOpen} />

        <div className="w-full mx-auto border rounded-lg flex-between py-2 px-8 justify-end">
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
