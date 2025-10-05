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
      <section className="hidden lg:block sticky top-0 z-10 bg-sidebar ">
        <HeaderFrame type="logo">
          <Logo />
        </HeaderFrame>
      </section>

      {/* Nav list (scrolls under the sticky header) */}
      <nav className="flex flex-col gap-4 lg:pl-4 xl:pl-6 mt-6">
        {links.map(({ slug, label }) => {
          const href = slug === 'index' ? `/${type}` : `/${type}/${slug}`;

          const isActive =
            pathname === href ||
            (slug === 'index' && (pathname === `/${type}` || pathname === `/${type}/`));

          return (
            <Link
              key={slug}
              href={href}
              className={` hover:underline ${isActive ? 'text-brand font-medium' : ''} `}
            >
              {slug === 'index' ? 'Overview' : label.replace(/\.mdx$/, '').replace(/-/g, ' ')}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
