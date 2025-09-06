import fs from 'fs/promises';
import path from 'path';
import { ReactNode } from 'react';
import './addons.layout.css';
import Sidebar from '@/components/Sidebar';

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
    <div className="flex fixed ">
      {/* Sidebar */}
      <Sidebar links={links} type="addons" />

      {/* Main content */}
      <main className="flex-1 px-36 h-screen overflow-y-auto pt-16">{children}</main>
    </div>
  );
}
