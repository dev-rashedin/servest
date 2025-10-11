'use client';
import { JSX, useState } from 'react';
import CodeBlock from './CodeBlock';
import { SiBun, SiDeno, SiNpm, SiPnpm, SiYarn } from '@/data';

interface CodeGroupProps {
  variants: Record<string, string>; // { npm: '...', pnpm: '...' }
  language?: string;
}

const codeIcons: Record<string, JSX.Element> = {
  npm: <SiNpm className="text-red-500  text-" />,
  yarn: <SiYarn className="text-[#3398C2] text-lg" />,
  pnpm: <SiPnpm className="text-amber-600" />,
  bun: <SiBun className="text-yellow-300 text-[14px]" />,
  deno: <SiDeno className="text-white rounded-full  text-[14px]" />,
};

export default function CodeGroup({ variants, language = 'bash' }: CodeGroupProps) {
  const keys = Object.keys(variants);
  const [selected, setSelected] = useState(keys[0]);

  return (
    <div className="rounded-lg border border-zinc-800 overflow-hidden">
      {/* Tab buttons */}
      <div className="flex bg-zinc-900 px-4 py-2 gap-3  text-zinc-300 border-b border-zinc-700">
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`px-2 rounded-md transition ${
              selected === key ? 'bg-zinc-700 text-white' : 'hover:bg-zinc-800 text-zinc-300'
            }`}
          >
            <span className="flex items-center gap-2">
              {codeIcons[key.toLowerCase()] ?? null} {key}
            </span>
          </button>
        ))}
      </div>

      {/* Selected code block */}
      <CodeBlock code={variants[selected]} language={language} />
    </div>
  );
}
