'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import AnimatedBorder from './AnimatedBorder';
import { IoIosArrowDown, IoIosArrowUp, RiArrowRightSLine, navItems } from '@/data';

function NavItem({ item, pathname, type = 'main' }: ItemProps) {
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
          } ${type === 'sub' ? 'ml-6 mt-1' : ''}`}
        >
          <span className="relative group flex items-center">
            {type === 'sub' && <RiArrowRightSLine />}
            {item.label}
            <AnimatedBorder />
          </span>
        </Link>
      ) : item.subMenu ? (
        <>
          <p className="px-2 pb-1 flex items-center gap-1 text-muted-foreground">{item.label}</p>
          {item.subMenu.map((sub: NavItemType) => (
            <NavItem key={sub.label} item={sub} pathname={pathname} type="sub" />
          ))}
        </>
      ) : (
        <button className="flex items-center gap-2">
          {item.label} {item.dropdown && (open ? <IoIosArrowUp /> : <IoIosArrowDown />)}
        </button>
      )}

      {item.dropdown && open && (
        <ul className="absolute -left-24 lg:-left-16 top-full w-[200px] bg-navbar rounded-xl flex flex-col gap-4 z-50 px-4 py-8">
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
    <ul className="hidden md:flex gap-8 xl:mr-20">
      {navItems.map((item) => (
        <NavItem key={item.label} item={item} pathname={pathname} />
      ))}
    </ul>
  );
}
