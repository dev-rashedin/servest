'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/data/constant';

export default function NavLink() {
  const pathname = usePathname();

  return (
    <ul className="hidden md:flex gap-8">
      {navItems.map(({ label, to }) => {
        const isActive = pathname === to;
        return (
          <li key={to}>
            <Link
              href={to}
              className={`
                group px-[2px] relative rounded-full cursor-pointer tracking-wide flex gap-2 items-center xl:text-lg
                ${isActive ? 'text-brand font-medium' : ''}
              `}
            >
              {label}
              <span className="absolute bottom-0 h-[2px] bg-yellow-dusk w-0 left-1/2 group-hover:w-full group-hover:left-0 transition-transformation duration-300 ease-in-out"></span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
