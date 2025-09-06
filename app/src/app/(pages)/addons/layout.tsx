import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { ReactNode } from 'react';
import './addons.layout.css';

export default async function AddonsLayout({ children }: { children: ReactNode }) {
  const dir = path.join(process.cwd(), '../docs/addons');
  const files = await fs.readdir(dir);

  // Remove index.mdx because it’s for the homepage
  const pages = files.filter((file) => file.endsWith('.mdx') && file !== 'index.mdx');

  const links = pages.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    return { slug, label: slug.charAt(0).toUpperCase() + slug.slice(1) };
  });

  return (
    <div className="flex fixed">
      {/* Sidebar */}
      <aside className="w-64 h-8 bg-gray-500 sticky top-0 overflow-y-auto border-r p-4 space-y-2">
        <nav className="flex flex-col gap-2">
          <Link href="/addons" className="font-semibold">
            Overview
          </Link>
          {links.map(({ slug, label }) => (
            <Link key={slug} href={`/addons/${slug}`} className="hover:underline">
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-36 h-screen overflow-y-auto">{children}</main>
    </div>
  );
}
