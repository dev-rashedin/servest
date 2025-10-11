'use client';
import { useState } from 'react';
import CodeBlock from './CodeBlock';

interface CodeGroupProps {
  variants: Record<string, string>; // { npm: '...', pnpm: '...' }
  language?: string;
}

export default function CodeGroup({ variants, language = 'bash' }: CodeGroupProps) {
  const keys = Object.keys(variants);
  const [selected, setSelected] = useState(keys[0]);

  return (
    <div className="rounded-lg border border-zinc-800 overflow-hidden">
      {/* Tab buttons */}
      <div className="flex bg-zinc-900 px-3 py-2 text-sm text-zinc-300 border-b border-zinc-700">
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`px-2 py-1 rounded-md transition ${
              selected === key ? 'bg-zinc-700 text-white' : 'hover:bg-zinc-800 text-zinc-400'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Selected code block */}
      <CodeBlock code={variants[selected]} language={language} />
    </div>
  );
}
