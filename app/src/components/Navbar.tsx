import { ThemeSwitcher } from './theme/theme-switcher';
import NavLink from './ui/Navlinks';
import MobileMenu from './ui/mobile-menu';
import Socials from './ui/socials';
import Logo from './ui/logo';
import HeaderFrame from './ui/header-frame';

const Navbar = ({ type = 'home' }: { type: string }) => {
  return (
    <HeaderFrame type={type}>
      <nav className="boundary flex-between">
        <Logo type={type} />
        <section className="flex-center gap-10 lg:gap-20">
          <NavLink />
          <MobileMenu />
          <div className={`hidden md:flex-center gap-4 ${type === 'sidebar' ? 'xl:mr-20' : ''}`}>
            <Socials />
            <ThemeSwitcher />
          </div>
        </section>
      </nav>
    </HeaderFrame>
  );
};

export default Navbar;
