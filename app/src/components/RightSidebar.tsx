// components/RightSidebar.tsx
'use client';
import { useEffect, useState } from 'react';

interface Heading { id: string; text: string; level: number }

export default function RightSidebar({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!headings?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry with largest intersectionRatio or first intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '0% 0% -65% 0%', threshold: [0, 0.1, 0.5, 1] },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

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

  return (
    <aside className="hidden xl:block fixed right-8 top-24 w-64">
      <div className="relative">
        {/* thin progress bar on the very right */}
        <div className="absolute right-0 top-0 h-full w-0.5 bg-neutral-200">
          <div className="bg-brand w-full" style={{ height: `${progress}%` }} />
        </div>

        {/* headings nav */}
        <nav className="pl-4">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(h.id);
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // optionally push state:
                history.replaceState(null, '', `#${h.id}`);
              }}
              className={`block text-sm leading-6 truncate ml-${(h.level - 2) * 3} ${
                activeId === h.id ? 'text-brand font-semibold' : 'text-muted'
              }`}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
