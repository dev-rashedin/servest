'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from './ui/logo';
import HeaderFrame from './ui/header-frame';
import { useSidebar } from './SidebarToggleContext';

const LeftSidebar = ({ links, type, nestedLinks }: DrawerProps) => {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

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
          if (item.type === 'group') {
            return (
              <p
                key={item.label}
                className={`text-[16px] font-semibold pt-3  ${item.label === 'Introduction' ? '' : ' border-t border-c-logo mt-3'} `}
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

      {/* nested nav items */}
      {pathname.includes('/guide') && nestedLinks && (
        <>
          {nestedLinks!.map((cat) => (
            <div key={cat.label}>
              {/* Category label (Express, Django, etc.) */}
              <p
                className={`text-[16px] font-semibold cursor-pointer hover:underline pt-3 ${
                  cat.label === 'Express' ? '' : ' border-t border-c-logo mt-3'
                }`}
                onClick={() =>
                  setOpenCategories((prev) => ({ ...prev, [cat.label]: !prev[cat.label] }))
                }
              >
                {cat.label} {openCategories[cat.label] ? '▾' : '▸'}
              </p>

              {/* Sub-items (express-basic-js, etc.) */}
              {openCategories[cat.label] &&
                cat.items?.map((sub) => {
                  const href = `/${type}/${sub.slug}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={sub.slug}
                      href={href}
                      className={`flex flex-col hover:underline ml-6 ${isActive ? 'text-brand font-medium' : ''}`}
                      onClick={() => setSidebarOpen && setSidebarOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  );
                })}
            </div>
          ))}
        </>
      )}
    </aside>
  );
};

export default LeftSidebar;
