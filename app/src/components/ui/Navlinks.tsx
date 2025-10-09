'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import AnimatedBorder from './AnimatedBorder';
import { IoIosArrowDown, IoIosArrowUp, navItems } from '@/data';

interface NavItemType {
  label: string;
  to?: string;
  dropdown?: NavItemType[];
}

interface ItemProps {
  item: NavItemType;
  pathname: string;
}

function NavItem({ item, pathname }: ItemProps) {
  const [open, setOpen] = useState(false);
  const isActive = pathname === item.to;

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setTimeout(() => setOpen(false), 300)}
    >
      {item.to ? (
        <Link
          href={item.to}
          className={`group relative rounded-full cursor-pointer tracking-wide flex gap-2 px-2 items-center ${
            isActive ? 'text-brand font-medium' : ''
          }`}
        >
          <span className="relative group">
            {item.label}
            <AnimatedBorder />
          </span>
        </Link>
      ) : (
        <button className="flex items-center gap-2">
          {item.label} {item.dropdown && (open ? <IoIosArrowUp /> : <IoIosArrowDown />)}
        </button>
      )}

      {item.dropdown && open && (
        <ul className="absolute -left-8 top-full bg-navbar w-48 shadow-lg rounded-xl flex flex-col gap-3 z-50 px-4 py-8">
          {item.dropdown.map((sub: NavItemType) => (
            <NavItem key={sub.label} item={sub} pathname={pathname} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function NavLink() {
  const pathname = usePathname();

  return (
    <ul className="hidden md:flex gap-8">
      {navItems.map((item) => (
        <NavItem key={item.label} item={item} pathname={pathname} />
      ))}
    </ul>
  );
}
