// components/RightSidebar.tsx
'use client';
import { useEffect, useState } from 'react';

interface Heading { id: string; text: string; level: number }

export default function RightSidebar({ clientHeadings }: { clientHeadings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  console.log(clientHeadings);

  useEffect(() => {
    if (!clientHeadings?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // choose visible with largest intersection
        const sorted = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (sorted.length) setActiveId(sorted[0].target.id);
      },
      { root: null, rootMargin: '0px 0px -60% 0px', threshold: [0, 0.1, 0.5, 1] },
    );

    clientHeadings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [clientHeadings]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!clientHeadings?.length) return null;

  return (
    <aside className="hidden xl:block fixed right-8 top-24 w-64 bg-white h-40">
      <div className="relative pl-4">
        {/* vertical progress bar at far right */}
        <div className="absolute right-0 top-0 h-full w-[2px] bg-neutral-200">
          <div className="bg-brand w-full" style={{ height: `${progress}%` }} />
        </div>

        {/* headings list */}
        <nav className="flex flex-col gap-2 max-h-[70vh] overflow-auto pr-3">
          {clientHeadings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(h.id);
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', `#${h.id}`);
              }}
              className={`block text-sm truncate ${activeId === h.id ? 'text-brand font-semibold' : 'text-muted'} ${h.level === 3 ? 'pl-4' : ''}`}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
