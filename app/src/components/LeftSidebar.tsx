'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './ui/logo';
import HeaderFrame from './ui/header-frame';
import { useSidebar } from './SidebarToggleContext';

const LeftSidebar = ({ links, type }: DrawerProps) => {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <aside
      className={`h-screen  pl-16 xl:pl-24 pt-6 lg:pt-0 fixed w-full lg:w-[25%] xl:w-[20%] overflow-y-auto ${sidebarOpen ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'}`}
    >
      {/* logo */}
      <section className="hidden lg:block sticky top-0 z-10 bg-sidebar ">
        <HeaderFrame type="logo">
          <Logo />
        </HeaderFrame>
      </section>

      {/* Nav list (scrolls under the sticky header) */}
      <nav className="flex flex-col gap-3 mt-6 pr-11">
        {links.map((item) => {
          if (item.type === 'group') {
            return (
              <p
                key={item.label}
                className="text-[16px] font-semibold mt-4 pt-2 border-t border-c-logo "
              >
                {item.label}
              </p>
            );
          }

          const href = item.slug === 'index' ? `/${type}` : `/${type}/${item.slug}`;
          const isActive =
            pathname === href ||
            (item.slug === 'index' && (pathname === `/${type}` || pathname === `/${type}/`));

          return (
            <Link
              key={item.slug}
              href={href}
              className={`hover:underline ${isActive ? 'text-brand font-medium' : ''}`}
              onClick={() => setSidebarOpen && setSidebarOpen(false)}
            >
              {item.slug === 'index' ? 'Overview' : item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default LeftSidebar;
