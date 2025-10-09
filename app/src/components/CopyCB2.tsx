'use client';
import { useState } from 'react';
import copy from 'copy-to-clipboard';

interface CopyableCodeBlockProps {
  codeHTML: Record<string, string> | string;
  isVariants: boolean;
}

export default function CopyableCodeBlock({ codeHTML, isVariants }: CopyableCodeBlockProps) {
  const variants = isVariants ? Object.keys(codeHTML as Record<string, string>) : ['default'];
  const [selected, setSelected] = useState(variants[0]);
  const [copied, setCopied] = useState(false);

  // Helper to strip HTML from highlighted code
  function stripHtml(html: string) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  // Copy code to clipboard
  const handleCopy = async () => {
    const textToCopy = typeof codeHTML === 'string' ? codeHTML : stripHtml(codeHTML[selected]);
    copy(textToCopy.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-zinc-800 bg-[#1e1e1e]">
      {/* Header with variants & copy button */}
      <div className="flex items-center justify-between bg-[#2a2a2a] px-3 py-2 text-sm text-zinc-300 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          {isVariants &&
            variants.map((key) => (
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
        <button
          onClick={handleCopy}
          className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Highlighted code */}
      <div
        className="[&_.shiki]:p-4 [&_.shiki]:block [&_.shiki_code]:text-[16px] overflow-x-auto"
        dangerouslySetInnerHTML={{
          __html: isVariants
            ? (codeHTML as Record<string, string>)[selected]
            : (codeHTML as string),
        }}
      />
    </div>
  );
}
