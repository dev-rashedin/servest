import { ThemeSwitcher } from './theme/theme-switcher';
import NavLink from './ui/NavLinks';
import MobileMenu from './ui/MobileMenu';
import Socials from './ui/SocialLinks';
import Logo from './ui/ServestLogo';
import HeaderFrame from './ui/HeaderFrame';

const Navbar = ({ type = 'home' }: { type: string }) => {
  return (
    <HeaderFrame type={type}>
      <nav className="boundary flex-between">
        <Logo type={type} />
        <section className="flex-center gap-10 lg:gap-16">
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
