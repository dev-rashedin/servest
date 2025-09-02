import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';
import { FaGithub } from 'react-icons/fa';
import { ThemeSwitcher } from './theme/theme-switcher';
import NavLink from './ui/navlink';

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
          <NavLink />

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
