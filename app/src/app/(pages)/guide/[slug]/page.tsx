import fs from 'fs/promises';
import path from 'path';
import { getContent } from '@/lib';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const files = await fs.readdir(path.join(process.cwd(), '../docs/guide'));
  return files.filter((f) => f.endsWith('.mdx')).map((f) => ({ slug: f.replace(/\.mdx$/, '') }));
}

// Updated props type to include optional searchParams
interface SlugPageProps {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function GuidPage({ params }: SlugPageProps) {
  const { content } = await getContent('guide', params.slug);

  return <div className="prose prose-lg">{content}</div>;
}
