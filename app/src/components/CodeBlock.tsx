// components/CodeBlock.tsx
import React from 'react';
import { createHighlighter } from 'shiki';

interface CodeBlockProps {
  code: string;
  language?: string;
}

let highlighterPromise: Promise<any> | null = null;

export default async function CodeBlock({ code, language = 'ts' }: CodeBlockProps) {
  // Initialize highlighter once
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['solarized-dark'],
      langs: ['ts', 'js', 'json', 'bash', 'html', 'css'],
    });
  }

  const highlighter = await highlighterPromise;

  const html = highlighter.codeToHtml(code, {
    lang: language,
    theme: 'solarized-dark',
  });

  return (
    <div className="my-4 overflow-x-auto rounded-md" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
