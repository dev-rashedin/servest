import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export default async function AddonsPage() {
  const dir = path.join(process.cwd(), '../docs/addons');
  const files = await fs.readdir(dir);
  const slugs = files.filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''));

  return (
    <div className="prose">
      <h1>Addons</h1>
      <ul>
        {slugs.map((slug) => (
          <li key={slug}>
            <Link href={`/addons/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
