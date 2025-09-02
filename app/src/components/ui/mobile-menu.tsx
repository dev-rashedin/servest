'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGithub } from 'react-icons/fi';
import { RiMenu3Fill } from 'react-icons/ri';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { navItems } from '@/lib/constant';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative">
      <button
        className="md:hidden flex items-center justify-center p-2 text-white hover:text-yellow-sunshine"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
          }`}
        >
          {isOpen ? <IoCloseCircleOutline size={27} /> : <RiMenu3Fill size={24} />}
        </span>
      </button>

      <div
        className={`md:hidden bg-black text-white w-72 px-4 pt-2 pb-4 space-y-4 flex flex-col absolute top-16 right-0
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        {navItems.map(({ label, to }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              href={to}
              className={`block font-medium tracking-wide px-2 py-1 rounded transition-colors duration-300 border-b pb-2 ml-2
                ${isActive ? 'text-yellow-sunshine' : 'text-white'}
                hover:text-yellow-dusk
              `}
            >
              {label}
            </Link>
          );
        })}

        <a
          href="https://github.com/dev-rashedin/servest"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-white hover:text-yellow-dusk transition-colors duration-300 ml-3 mt-3"
        >
          <FiGithub size={20} /> GitHub
        </a>
      </div>
    </div>
  );
}
