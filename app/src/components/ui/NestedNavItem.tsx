import { useState } from 'react';
import Link from 'next/link';

interface NavItemProps {
  item: any;
  type: string;
  pathname: string;
}

const NestedNavItem = ({ item, type, pathname }: NavItemProps) => {
  const [open, setOpen] = useState(false);

  if (item.type === 'group') {
    return (
      <p className="text-[16px] font-semibold pt-3 border-t border-c-logo mt-3">{item.label}</p>
    );
  }

  if (item.type === 'sub-group') {
    return (
      <div>
        <button
          className="flex justify-between w-full font-medium text-left mt-2"
          onClick={() => setOpen((prev) => !prev)}
        >
          {item.label}
          <span>{open ? '▾' : '▸'}</span>
        </button>
        <div className={`ml-4 mt-1 ${open ? 'block' : 'hidden'}`}>
          {item.items.map((sub: any) => (
            <Link
              key={sub.slug}
              href={`/${type}/${sub.slug}`}
              className={`block ml-4 mb-1 hover:underline ${
                pathname === `/${type}/${sub.slug}` ? 'text-brand font-medium' : ''
              }`}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/${type}/${item.slug}`}
      className={`block hover:underline ${
        pathname === `/${type}/${item.slug}` ? 'text-brand font-medium' : ''
      }`}
    >
      {item.slug === 'index' ? 'Overview' : item.label}
    </Link>
  );
};

export default NestedNavItem;
