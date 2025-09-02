import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';
import { FaGithub } from 'react-icons/fa';
import { ThemeSwitcher } from './theme/theme-switcher';
import { navItems } from '@/lib/constant';

const Navbar = (): JSX.Element => {
  return (
    <nav className="flex justify-between items-center h-20 pt-2 sticky top-0 border-b bg-[rgb(var(--navbar-bg))] border-border shadow-3xl">
      <main className="boundary flex-between">
        {/* logo */}
        <div>
          <Link href="/" className="flex-center gap-2">
            <Image src="/logo.svg" width={40} height={40} alt="logo" />
            <h1 className="text-xl md:text-2xl font-bold font-heading">Servest</h1>
          </Link>
        </div>

        <section className="flex-center gap-20">
          {/* nav links */}
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>

          {/* nav links */}
          <div className="flex-center gap-4">
            <Link
              href="https://github.com/dev-rashedin/servest"
              target="_blank"
              className="group relative inline-flex items-center justify-center"
            >
              <FaGithub className="text-xl xl:text-2xl z-10" />

              {/* Circle effect */}
              <span
                className="absolute w-10 h-10 rounded-full scale-0 group-hover:scale-90 
               border-2 border-yellow-sunshine transition-transform duration-300"
              />
            </Link>
            <ThemeSwitcher />
          </div>
        </section>
      </main>
    </nav>
  );
};
export default Navbar;
