'use client';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { RiNpmjsFill } from 'react-icons/ri';
import { SiBun, SiDeno, SiPnpm, SiYarn } from 'react-icons/si';

interface CopyableCodeBlockProps {
  codeHTML: string | Record<string, string>;
  language?: string;
}

const codeIcons: Record<string, JSX.Element> = {
  npm: <RiNpmjsFill className="text-red-500" />,
  yarn: <SiYarn className="text-[#3398C2]" />,
  pnpm: <SiPnpm className="text-green-600" />,
  bun: <SiBun className="text-yellow-500" />,
  deno: <SiDeno className="text-black" />,
};

export default function CopyableCodeBlock({ codeHTML, language = 'bash' }: CopyableCodeBlockProps) {
  const isVariants = typeof codeHTML !== 'string';
  const codeKeys = isVariants ? Object.keys(codeHTML) : [];
  const [copied, setCopied] = useState(false);
  const [selected, setSelected] = useState(isVariants ? Object.keys(codeHTML)[0] : 'default');

  const stripHtml = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const handleCopy = async () => {
    const textToCopy = isVariants ? stripHtml(codeHTML[selected]) : stripHtml(codeHTML as string);
    copy(textToCopy.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const headerLabel = isVariants ? selected : language;

  return (
    <div className="rounded-lg overflow-hidden border border-zinc-800 bg-[#1e1e1e]">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#2a2a2a] px-3 py-2 text-sm text-zinc-300 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          {isVariants ? (
            codeKeys.map((key) => (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className={`px-2 py-1 rounded-md flex items-center gap-1 transition ${
                  selected === key ? 'bg-zinc-700 text-white' : 'hover:bg-zinc-800 text-zinc-400'
                }`}
              >
                {codeIcons[key.toLowerCase()] ?? null}
                {key}
              </button>
            ))
          ) : (
            <span className="uppercase tracking wider text-xs text-zinc-300">{headerLabel}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code Body */}
      <div
        className="[&_.shiki]:p-4 [&_.shiki]:block [&_.shiki_code]:text-[16px]"
        dangerouslySetInnerHTML={{
          __html: isVariants ? codeHTML[selected] : (codeHTML as string),
        }}
      />
    </div>
  );
}
