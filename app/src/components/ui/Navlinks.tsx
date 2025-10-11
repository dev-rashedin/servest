'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import AnimatedBorder from './AnimatedBorder';
import { IoIosArrowDown, IoIosArrowUp, RiArrowRightSLine, navItems } from '@/data';
import { useScreenSize } from '@/hooks';

function NavItem({ item, pathname, type = 'main' }: ItemProps) {
  const [open, setOpen] = useState(false);
  const { isLargeScreen, isMobile } = useScreenSize();

  console.log('isLargeScreen', isLargeScreen);

  const isActive = pathname === item.to;

  const isNative =
    item.label === 'Blog' ||
    item.label === 'Guide' ||
    item.label === 'Config' ||
    item.label === 'Addons';

  const handleMouseEnter = () => isLargeScreen && setOpen(true);
  const handleMouseLeave = () => {
    if (isLargeScreen) {
      setTimeout(() => setOpen(false), 300);
    }
  };
  const handleClick = () => !isLargeScreen && setOpen((prev) => !prev);

  return (
    <li
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {item.to ? (
        <Link
          href={item.to}
          target={isNative ? '_self' : '_blank'}
          className={`group relative flex gap-2 px-2 items-center rounded-full cursor-pointer tracking-wide  ${
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
        <button className="flex items-center gap-2 ml-2 md:ml-0">
          {item.label} {item.dropdown && (open ? <IoIosArrowUp /> : <IoIosArrowDown />)}
        </button>
      )}

      {item.dropdown && open && (
        <ul
          className={`w-[200px] rounded-xl flex flex-col gap-4 z-50 px-4 py-8 ${
            isMobile ? '' : 'absolute -left-24 lg:-left-16 top-full bg-navbar'
          }`}
        >
          {item.dropdown.map((sub: NavItemType) => (
            <NavItem key={sub.label} item={sub} pathname={pathname} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function NavLink({ dropdownOpen = false }: { dropdownOpen?: boolean }) {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const { isMobile } = useScreenSize();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const renderedNavItems = useMemo(
    () => navItems.map((item) => <NavItem key={item.label} item={item} pathname={pathname} />),
    [pathname],
  );

  if (!hydrated) return null;

  return (
    <ul
      className={`${isMobile ? (dropdownOpen ? 'flex' : 'hidden') : 'flex'} flex-col md:flex-row gap-8 xl:mr-36`}
    >
      {renderedNavItems}
    </ul>
  );
}
