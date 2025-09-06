'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = ({ links, type }: { links: { slug: string; label: string }[]; type: string }) => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen sticky top-0 overflow-y-auto border-r p-4 space-y-2 pt-8">
      <nav className="flex flex-col gap-2">
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
