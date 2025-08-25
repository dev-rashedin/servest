import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';

const Navbar = (): JSX.Element => {
  return (
    <nav className="flex justify-between items-center h-20 sticky top-0">
      <div>
        <Link href="/" className="flex-center gap-2">
          <Image src="/logo.svg" width={40} height={40} alt="logo" />
          <h1 className="text-2xl font-bold">Servest</h1>
        </Link>
      </div>
      <div>
        <ul className="flex gap-8">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/docs">Docs</Link>
          </li>
          <li>
            <Link href="/guide">Guide</Link>
          </li>
          <li>
            <Link href="/blogs">Blogs</Link>
          </li>
          <li>
            <Link href="/github">GitHub</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
