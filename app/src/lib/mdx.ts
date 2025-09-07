// lib/mdx.ts (server)
import fs from 'fs/promises';
import path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import { visit } from 'unist-util-visit';
import toString from 'mdast-util-to-string';
import Slugger from 'github-slugger';

export async function readMdxFile(section: string, slug: string) {
  const filePath = path.join(process.cwd(), 'docs', section, `${slug}.mdx`);
  const source = await fs.readFile(filePath, 'utf8');
  return source;
}

/**
 * Extract headings (id, text, level) from MDX content.
 * This is synchronous (fast) and safe to run at build time.
 */
export function extractHeadingsFromMdx(source: string) {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(source);
  const slugger = new Slugger();
  const headings: { id: string; text: string; level: number }[] = [];

  visit(tree, 'heading', (node: any) => {
    const text = toString(node);
    const id = slugger.slug(text); // stable slug like "server-options"
    headings.push({ id, text, level: node.depth });
  });

  return headings;
}
