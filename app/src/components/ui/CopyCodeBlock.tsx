'use client';
/* eslint-env browser */
import { useState } from 'react';
import copy from 'copy-to-clipboard';

interface CopyableCodeBlockProps {
  codeHTML: Record<string, string>;
  isVariants: boolean;
}

export default function CopyableCodeBlock({ codeHTML, isVariants }: CopyableCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [selected, setSelected] = useState(isVariants ? Object.keys(codeHTML)[0] : 'default');

  function stripHtml(html: string) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  const handleCopy = async () => {
    const textToCopy = typeof codeHTML === 'string' ? codeHTML : stripHtml(codeHTML[selected]);
    copy(textToCopy.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Helper to strip HTML tags for copying

  return (
    <div className="rounded-lg overflow-hidden border border-zinc-800 bg-[#1e1e1e]">
      {/* header bar */}
      <div className="flex items-center justify-between bg-[#2a2a2a] px-3 py-2 text-sm text-zinc-300 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          {isVariants ? (
            Object.keys(codeHTML).map((key) => (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className={`px-2 py-1 rounded-md transition ${
                  selected === key ? 'bg-zinc-700 text-white' : 'hover:bg-zinc-800 text-zinc-400'
                }`}
              >
                {key}
              </button>
            ))
          ) : (
            <span></span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <div
        className="[&_.shiki]:p-4 [&_.shiki]:block [&_.shiki_code]:text-[16px]"
        dangerouslySetInnerHTML={{ __html: codeHTML[selected] }}
      />
    </div>
  );
}
