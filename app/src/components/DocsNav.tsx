import { ThemeSwitcher } from './theme/theme-switcher';
import MobileMenu from './ui/mobile-menu';
import NavLink from './ui/navlink';
import Socials from './ui/socials';

const DocsNav = () => {
  return (
    <nav className="border border-red-500 flex align-self-end items-center h-20 pt-2 sticky top-0 border-b border-border shadow-3xl">
      <main className="boundary flex-between">
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
export default DocsNav;
