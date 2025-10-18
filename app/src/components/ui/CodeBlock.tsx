'use client';

import { useEffect, useState } from 'react';
import { createHighlighter } from 'shiki';
import CopyableCodeBlock from './CopyCodeBlock';

export default function CodeBlock({ code, language = 'bash' }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [variantHtml, setVariantHtml] = useState<Record<string, string> | null>(null);

  let parsed: Record<string, string> | null = null;
  try {
    parsed = Function(`"use strict"; return (${code})`)();
  } catch {
    parsed = null;
  }

  const isVariants = !!parsed && typeof parsed === 'object' && !Array.isArray(parsed);

  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      const highlighter = await createHighlighter({
        themes: ['andromeeda'],
        langs: ['ts', 'js', 'bash', 'json', 'tsx', 'jsx', 'css', 'html', 'prisma', 'dotenv', 'mdx'],
      });

      if (isVariants && parsed) {
        const entries = await Promise.all(
          Object.entries(parsed).map(async ([key, value]) => [
            key,
            highlighter.codeToHtml(value, { lang: language, theme: 'andromeeda' }),
          ]),
        );

        if (!cancelled) setVariantHtml(Object.fromEntries(entries));
      } else {
        const htmlResult = highlighter.codeToHtml(code, { lang: language, theme: 'andromeeda' });
        if (!cancelled) setHtml(htmlResult);
      }
    }

    highlight();

    return () => {
      cancelled = true;
    };
  }, [code, language, isVariants]);

  if ((isVariants && !variantHtml) || (!isVariants && !html)) {
    return (
      <div className="w-full rounded-lg bg-[#1e1e2e] text-[#a6accd] p-4 font-mono text-sm animate-pulse">
        Loading code snippet…
      </div>
    );
  }

  return (
    <CopyableCodeBlock
      codeHTML={isVariants ? (variantHtml as Record<string, string>) : html!}
      language={language}
    />
  );
}
