import Image from 'next/image';
import Link from 'next/link';
import { ThemeSwitcher } from './theme/theme-switcher';
import NavLink from './ui/navlink';
import MobileMenu from './ui/mobile-menu';
import Socials from './ui/socials';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-20 pt-2 sticky top-0 border-b bg-[rgb(var(--navbar-bg))] border-border shadow-3xl">
      <main className="boundary flex-between">
        {/* logo */}
        <Link href="/" className="flex-center gap-2 group group-hover:brightness-110">
          <Image src="/logo.svg" width={40} height={40} alt="logo" />
          <span className="font-heading font-extrabold text-2xl tracking-tight text-brand">
            Servest
          </span>
        </Link>

        <section className="flex-center gap-10 lg:gap-20">
          {/* nav links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink />
          </div>

          <MobileMenu />
          {/* socials and theme */}
          <div className="hidden md:flex-center gap-4">
            <Socials />
            <ThemeSwitcher />
          </div>
        </section>
      </main>
    </nav>
  );
};
export default Navbar;
