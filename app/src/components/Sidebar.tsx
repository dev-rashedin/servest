'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './ui/logo';
import HeaderFrame from './ui/header-frame';

const Sidebar = ({ links, type }: { links: { slug: string; label: string }[]; type: string }) => {
  const pathname = usePathname();

  return (
    <aside className="h-screen hidden lg:flex lg:flex-col lg:pl-16 xl:pl-24 fixed w-[25%] lg:w-[20%] overflow-y-auto">
      {/* logo */}
      <section className="sticky top-0 z-10 bg-sidebar ">
        <HeaderFrame type="logo">
          <Logo />
        </HeaderFrame>
      </section>

      {/* Nav list (scrolls under the sticky header) */}
      <nav className="flex flex-col gap-4 lg:pl-4 xl:pl-6 mt-6">
        <Link
          href={`/${type}`}
          className={`font-medium hover:underline ${
            pathname === `/${type}` || pathname === `/${type}/` ? 'text-brand' : ''
          }`}
        >
          Overview
        </Link>

        {links.map(({ slug, label }) => {
          const isActive = pathname === `/${type}/${slug}`;
          return (
            <Link
              key={slug}
              href={`/${type}/${slug}`}
              className={` hover:underline ${isActive ? 'text-brand font-medium' : ''}`}
            >
              {label.split('.')[0]}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
