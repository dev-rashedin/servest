'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = ({ links, type }: { links: { slug: string; label: string }[]; type: string }) => {
  const pathname = usePathname();

  return (
    <aside className=" pt-4 hidden lg:block lg:pl-16 xl:pl-24 h-screen ">
      {/* <Logo />
      <div className="border-t-2 border-border w-[200px] my-2 "></div> */}
      <nav className="lg:pl-4 mt-8 flex flex-col gap-4 fixed overflow-y-auto">
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
