'use client';
import { useEffect, useState } from 'react';
import { ThemeSwitcher } from './theme/theme-switcher';
import NavLink from './ui/navlink';
import MobileMenu from './ui/mobile-menu';
import Socials from './ui/socials';
import Logo from './ui/logo';
import HeaderFrame from './ui/header-frame';

const Navbar = ({ type = 'home' }: { type: string }) => {
  const [mounted, setMounted] = useState(false);

  // Animation on initial load
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <HeaderFrame type={type}>
      <nav className="boundary flex-between w-full transition-all duration-300 ease-in-out py-3 sm:py-4">
        {/* Logo with fade-in animation */}
        <div
          className={`
          transition-all duration-700 ease-out
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          scale-90 sm:scale-100
        `}
        >
          <Logo />
        </div>

        {/* Navigation elements with staggered fade-in */}
        <section className="flex-center gap-4 sm:gap-6 lg:gap-16">
          <div
            className={`
            hidden md:block transition-all duration-700 delay-100 ease-out
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          `}
          >
            <NavLink />
          </div>

          <div
            className={`
            hidden md:flex-center gap-4 sm:gap-6 transition-all duration-700 delay-200 ease-out
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          `}
          >
            <Socials />
            <div className="border-l border-border/30 h-6 mx-1"></div>
            <ThemeSwitcher />
          </div>

          <div
            className={`
            md:hidden transition-all duration-700 delay-100 ease-out
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          `}
          >
            <MobileMenu />
          </div>
        </section>
      </nav>
    </HeaderFrame>
  );
};

export default Navbar;
