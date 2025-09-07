import { ThemeSwitcher } from './theme/theme-switcher';
import Logo from './ui/logo';
import MobileMenu from './ui/mobile-menu';
import NavLink from './ui/navlink';
import Socials from './ui/socials';

const DocsNav = () => {
  return (
    <main className=" flex items-center h-20 pt-2 sticky top-0 border-b-2 border-border drop-shadow-2xl">
      <nav className="boundary flex justify-between lg:justify-end">
        <section className="lg:hidden">
          <Logo />
        </section>
        <section className="flex-center gap-10 lg:gap-12 xl:gap-20">
          {/* nav links */}
          <div className="hidden md:block">
            <NavLink />
          </div>

          <MobileMenu />
          {/* socials and theme */}
          <div className="hidden md:flex-center gap-4 xl:mr-20">
            <Socials />
            <ThemeSwitcher />
          </div>
        </section>
      </nav>
    </main>
  );
};
export default DocsNav;
