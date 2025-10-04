'use client';
import { useEffect, useRef, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function RightSidebar({ clientHeadings }: { clientHeadings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [indicatorY, setIndicatorY] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  console.log('progress', progress);

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

  useEffect(() => {
    if (!activeId || !sidebarRef.current) return;
    const linkEl = sidebarRef.current.querySelector<HTMLAnchorElement>(`a[href="#${activeId}"]`);
    if (linkEl) {
      const rect = linkEl.getBoundingClientRect();
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      setIndicatorY(rect.top - sidebarRect.top);
    }
  }, [activeId]);

  if (!clientHeadings?.length) return null;

  return (
    <aside className="hidden xl:block fixed right-20 xl:right-48 top-48 w-64">
      <div className="relative pl-4">
        {/* vertical progress bar at far right */}
        <div
          className="absolute left-0 w-[2px] bg-brand transition-all duration-300"
          style={{ top: `${indicatorY}px`, height: '20px' }}
        />

        {/* headings list */}
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
              className={`block truncate ${activeId === h.id ? 'text-brand font-semibold' : 'text-muted-foreground'} ${h.level === 3 ? 'pl-6' : ''}`}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
