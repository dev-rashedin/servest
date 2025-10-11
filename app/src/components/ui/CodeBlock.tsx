import React from 'react';
import { type Highlighter, createHighlighter } from 'shiki';
import CopyableCodeBlock from './CopyCodeBlock';

let highlighterPromise: Promise<Highlighter> | null = null;

export default async function CodeBlock({ code, language = 'bash' }: CodeBlockProps) {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['andromeeda'],
      langs: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'bash',
        'html',
        'css',
        'prisma',
        'graphql',
        'dotenv',
        'md',
        'mdx',
      ],
    });
  }

  const highlighter = await highlighterPromise;

  const isVariants = typeof code === 'object';

  const htmls = isVariants
    ? Object.fromEntries(
        Object.entries(code).map(([key, snippet]) => [
          key,
          highlighter.codeToHtml(snippet as string, { lang: language, theme: 'andromeeda' }),
        ]),
      )
    : { default: highlighter.codeToHtml(code as string, { lang: language, theme: 'andromeeda' }) };

  return <CopyableCodeBlock codeHTML={htmls} isVariants={isVariants} />;
}
