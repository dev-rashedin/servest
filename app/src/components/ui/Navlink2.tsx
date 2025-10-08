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
          className={`group px-[2px] relative rounded-full cursor-pointer tracking-wide flex gap-2 items-center ${
            isActive ? 'text-brand font-medium' : ''
          }`}
        >
          {item.label}
          <AnimatedBorder />
        </Link>
      ) : (
        <button className="flex items-center gap-1">
          {item.label} {item.dropdown && (open ? <IoIosArrowUp /> : <IoIosArrowDown />)}
        </button>
      )}

      {item.dropdown && open && (
        <ul className="absolute left-0 top-full bg-sidebar z-50 shadow-lg rounded-xl w-48 flex flex-col gap-3 px-4 py-2">
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
