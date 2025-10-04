import fs from 'fs/promises';
import path from 'path';
import { getContent } from '@/lib';
import RightSidebar from '@/components/RightSidebar';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const files = await fs.readdir(path.join(process.cwd(), '../docs/guide'));

  // Type assertion ensures TS sees it as Array<{slug: string}>
  const params = files
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace(/\.mdx$/, '') })) as { slug: string }[];

  return params;
}

export default async function GuidPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { content, headings } = await getContent('guide', slug);

  <div className="flex gap-8">
    <article className="prose prose-lg flex-1">{content}</article>
    <RightSidebar clientHeadings={headings} />
  </div>;
}
