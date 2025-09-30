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
      themes: ['andromeeda'],
      langs: ['ts', 'tsx', 'js', 'jsx', 'json', 'bash', 'html', 'css'],
    });
  }

  const highlighter = await highlighterPromise;

  const html = highlighter.codeToHtml(code, {
    lang: language,
    theme: 'andromeeda',
  });

  return (
    <div
      className="overflow-x-auto rounded-md [&_.shiki]:text-lg [&_.shiki_code]:text-[16px]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
