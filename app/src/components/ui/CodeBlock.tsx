'use client';
import { useEffect, useState } from 'react';
import { createHighlighter } from 'shiki';
import CopyableCodeBlock from './CopyCodeBlock';

export default function CodeBlock({ code, language = 'bash' }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      const highlighter = await createHighlighter({
        themes: ['andromeeda'],
        langs: ['ts', 'js', 'bash', 'json', 'tsx', 'jsx', 'css', 'html'],
      });

      const htmlResult = highlighter.codeToHtml(code, { lang: language, theme: 'andromeeda' });

      if (!cancelled) setHtml(htmlResult);
    }

    highlight();

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  if (!html) return <pre>Loading...</pre>;
  return <CopyableCodeBlock codeHTML={{ default: html }} isVariants={false} />;
}
