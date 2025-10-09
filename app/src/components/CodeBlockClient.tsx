'use client';
import { useEffect, useState } from 'react';

import CodeBlock from './CodeBlock';
import CopyableCodeBlock from './CopyCB2';

export default function CodeBlockClient({ code, language }: { code: string; language?: string }) {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await CodeBlock({ code, language });
      if (!cancelled) setHtml(result?.props?.dangerouslySetInnerHTML?.__html ?? '');
    })();
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  if (!html) return null;

  return <CopyableCodeBlock codeHTML={html} isVariants={false} />;
}
