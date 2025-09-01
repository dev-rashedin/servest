import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';
import { navItems } from '@/lib/constant';

const Navbar = (): JSX.Element => {
  return (
    <nav className="flex justify-between items-center h-20 pt-2 sticky top-0 border-b bg-gray-950 border-gray-800 shadow-3xl">
      <main className="boundary flex-between">
        {/* logo */}
        <div>
          <Link href="/" className="flex-center gap-2">
            <Image src="/logo.svg" width={40} height={40} alt="logo" />
            <h1 className="text-2xl font-bold font-heading">Servest</h1>
          </Link>
        </div>
        {/* ul links */}
        <div>
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </nav>
  );
};
export default Navbar;
