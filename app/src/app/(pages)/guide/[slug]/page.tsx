import fs from 'fs/promises';
import path from 'path';
import DisplayContent from '@/components/DisplayContent';

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

  return <DisplayContent endpoint="guide" slug={slug} />;
}
