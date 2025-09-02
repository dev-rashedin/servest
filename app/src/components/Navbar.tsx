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
            {/* <h1 className="font-extrabold text-xl md:text-2xl font-heading">Servest</h1> */}
            <span className="font-heading font-extrabold text-xl lg:text-2xl tracking-tight bg-gradient-to-r from-yellow-sunshine to-yellow-dusk text-transparent bg-clip-text relative">
              Servest
            </span>
          </Link>
        </div>

        <section className="flex-center gap-20">
          {/* nav links */}
          <ul className="flex gap-8">
            {navItems.map(({ label, to }) => (
              <li key={to}>
                <Link
                  href={to}
                  className="group px-[2px] relative rounded-full hover:text-yellow-sunshine cursor-pointer tracking-wide flex gap-2 items-center xl:text-lg"
                >
                  {label}
                  <span className="absolute bottom-0 h-[2px] bg-yellow-dusk w-0 left-1/2  group-hover:w-full group-hover:left-0 transition-transformation duration-300 ease-in-out"></span>
                </Link>
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
              <FaGithub className="text-2xl z-10" />
            </Link>
            <ThemeSwitcher />
          </div>
        </section>
      </main>
    </nav>
  );
};
export default Navbar;
