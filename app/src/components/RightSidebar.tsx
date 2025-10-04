'use client';
import { useEffect, useRef, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function RightSidebar({ clientHeadings }: { clientHeadings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [indicatorY, setIndicatorY] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Track active heading using IntersectionObserver
  useEffect(() => {
    if (!clientHeadings?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          const topMost = visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          setActiveId(topMost.target.id);
        }
      },
      { root: null, rootMargin: '0px 0px -60% 0px', threshold: [0, 0.1, 0.5, 1] },
    );

    clientHeadings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [clientHeadings]);

  // Compute indicator Y relative to scrollable nav
  useEffect(() => {
    if (!activeId || !sidebarRef.current) return;

    const linkEl = sidebarRef.current.querySelector<HTMLAnchorElement>(`a[href="#${activeId}"]`);
    if (linkEl) {
      const newY = linkEl.offsetTop - sidebarRef.current.scrollTop;
      setIndicatorY(newY);
    }
  }, [activeId]);

  if (!clientHeadings?.length) return null;

  return (
    <aside className="hidden xl:block fixed right-20 xl:right-48 top-48 w-64">
      <div className="relative pl-4">
        {/* small vertical indicator */}
        <div
          className="absolute left-0 w-[2px] bg-brand rounded transition-transform duration-200"
          style={{ transform: `translateY(${indicatorY}px)`, height: '20px' }}
        />

        {/* scrollable headings list */}
        <nav ref={sidebarRef} className="flex flex-col gap-3 max-h-[70vh] overflow-auto">
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
              className={`block truncate ${
                activeId === h.id ? 'text-muted-foreground brightness-200' : 'text-muted-foreground'
              } ${h.level === 3 ? 'pl-6' : ''}`}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
