'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = ({ links, type }: { links: { slug: string; label: string }[]; type: string }) => {
  const pathname = usePathname();

  return (
    <aside className="h-full border-r space-y-8 pt-8 hidden lg:block lg:pl-20 xl:pl-28">
      <nav className=" overflow-y-auto flex flex-col gap-3">
        <Link
          href={`/${type}`}
          className={`font-semibold hover:underline ${
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
              className={`hover:underline ${isActive ? 'text-brand font-semibold' : ''}`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
