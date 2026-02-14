'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from './ui/ServestLogo';
import HeaderFrame from './ui/HeaderFrame';
import { useSidebar } from './SidebarToggleContext';
import AnimatedBorder from './ui/AnimatedBorder';
import { RiArrowRightDoubleFill } from '@/data';

const LeftSidebar = ({ links, type, nestedLinks }: DrawerProps) => {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({ Express: true });

  return (
    <aside
      className={`h-screen pl-8 lg:pl-12 xl:pl-24 pt-6 lg:pt-0 fixed w-full lg:w-[25%] xl:w-[20%] overflow-y-auto ${sidebarOpen ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'}`}
    >
      {/* logo */}
      <section className="hidden lg:block sticky top-0 z-10 bg-sidebar ">
        <HeaderFrame type="logo">
          <Logo />
        </HeaderFrame>
      </section>

      {/* Nav list (scrolls under the sticky header) */}
      <nav className="flex flex-col pl-4 md:pl-8 lg:pl-0  text-start gap-3 mt-6 pr-11">
        {links.map((item) => {
          // displaying group title
          if (item.type === 'group') {
            return (
              <p
                key={item.label}
                className={`text-[16px] font-semibold  ${item.label === 'Introduction' || item.label === 'Templates' ? '' : 'pt-3 border-t border-c-logo mt-3'} `}
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
              className={`w-full max-w-fit relative group ${isActive ? 'text-brand font-medium' : ''}`}
              onClick={() => setSidebarOpen && setSidebarOpen(false)}
            >
              {item.slug === 'index' ? 'Overview' : item.label}
              <AnimatedBorder />
            </Link>
          );
        })}
      </nav>

      {/* nested nav items */}
      {pathname.includes('/guide') && nestedLinks && (
        <section className="ml-6 md:ml-9 lg:ml-3">
          {nestedLinks!.map((cat, idx) => (
            <div key={cat.label}>
              {/* Category label */}
              <p
                className={`flex items-center gap-2 text-[16px] cursor-pointer ${idx === 0 ? 'mt-3' : 'mt-4'}`}
                onClick={() =>
                  setOpenCategories((prev) => ({ ...prev, [cat.label]: !prev[cat.label] }))
                }
              >
                <span
                  className={`inline-block transform transition-transform duration-300 ease-in-out ${
                    openCategories[cat.label] ? 'rotate-90' : 'rotate-0'
                  }`}
                >
                  <RiArrowRightDoubleFill />
                </span>

                {cat.label}
              </p>

              {/* Sub-items (express-basic-js, etc.) */}
              <div
                className={`overflow-hidden transform transition-all duration-100 ease-in-out ml-6 ${
                  openCategories[cat.label]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-2'
                }`}
              >
                {openCategories[cat.label] &&
                  cat.items?.map((sub) => {
                    const href = `/${type}/${cat.label.toLowerCase()}/${sub.slug}`;
                    const isActive = pathname === href;

                    return (
                      <Link
                        key={sub.slug}
                        href={href}
                        className={`group relative w-full max-w-fit flex flex-col mt-2  ${isActive ? 'text-brand font-medium' : ''}`}
                        onClick={() => setSidebarOpen && setSidebarOpen(false)}
                      >
                        {sub.label}
                        <AnimatedBorder />
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </section>
      )}
    </aside>
  );
};

export default LeftSidebar;
