import fs from 'fs/promises';
import path from 'path';
import RightSidebar from '@/components/RightSidebar';

import { getContent } from '@/lib';

// ✅ generateStaticParams
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const files = await fs.readdir(path.join(process.cwd(), '../docs/addons'));
  return files.filter((f) => f.endsWith('.mdx')).map((f) => ({ slug: f.replace(/\.mdx$/, '') }));
}

// ✅ Page props type including optional searchParams
interface SlugPageProps {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function AddonPage({ params }: SlugPageProps) {
  const { content, headings } = await getContent('addons', params.slug);

  return (
    <div className="flex gap-8">
      <article className="prose prose-lg flex-1">{content}</article>
      <RightSidebar clientHeadings={headings} />
    </div>
  );
}
