import { ThemeSwitcher } from './theme/theme-switcher';
import HeaderFrame from './ui/header-frame';
import Logo from './ui/logo';
import MobileMenu from './ui/mobile-menu';
import NavLink from './ui/navlink';
import Socials from './ui/socials';

const DocsNav = () => {
  return (
    <HeaderFrame bg="bg-docs">
      <section className="lg:hidden">
        <Logo />
      </section>
      <section className="flex-center gap-10 lg:gap-20">
        <NavLink />
        <MobileMenu />
        <div className="hidden md:flex-center gap-4 xl:mr-20">
          <Socials />
          <ThemeSwitcher />
        </div>
      </section>
    </HeaderFrame>
  );
};
export default DocsNav;
