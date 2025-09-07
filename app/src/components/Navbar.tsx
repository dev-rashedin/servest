import { ThemeSwitcher } from './theme/theme-switcher';
import NavLink from './ui/navlink';
import MobileMenu from './ui/mobile-menu';
import Socials from './ui/socials';
import Logo from './ui/logo';
import HeaderFrame from './ui/header-frame';

// const Navbar = ({ type = 'home' }: { type: string }) => {
//   return (
//     <nav
//       className={`flex justify-between items-center h-20 pt-2 sticky top-0 border-b  border-border shadow-3xl ${type === 'home' ? 'bg-[rgb(var(--navbar-bg))]' : 'bg-docs'}`}
//     >
//       <main className="boundary flex-between">
//         {/* logo */}
//         <Logo />
//         <section className="flex-center gap-10 lg:gap-20">
//           {/* nav links */}
//           <div className="hidden md:flex items-center gap-8">
//             <NavLink />
//           </div>

//           <MobileMenu />
//           {/* socials and theme */}
//           <div className="hidden md:flex-center gap-4">
//             <Socials />
//             <ThemeSwitcher />
//           </div>
//         </section>
//       </main>
//     </nav>
//   );
// };

const Navbar = ({ type = 'home' }: { type: string }) => {
  return (
    <HeaderFrame type={type}>
      <nav className="boundary flex-between">
        <Logo />
        <section className="flex-center gap-10 lg:gap-20">
          <NavLink />
          <MobileMenu />
          <div className="hidden md:flex-center gap-4">
            <Socials />
            <ThemeSwitcher />
          </div>
        </section>
      </nav>
    </HeaderFrame>
  );
};

export default Navbar;
