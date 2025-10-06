'use client';
import { useEffect, useRef, useState } from 'react';

export default function RightSidebar({ clientHeadings }: { clientHeadings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [indicatorY, setIndicatorY] = useState(40);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Detecting which heading is visible
  useEffect(() => {
    if (!clientHeadings?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length) {
          const newId = visible[0].target.id;
          if (newId !== activeId) setActiveId(newId);
        }
      },
      {
        rootMargin: '0px 0px -60% 0px',
        threshold: [0.1, 0.5, 1],
      },
    );

    clientHeadings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [clientHeadings, activeId]);

  // Moving the highlight indicator with subtle smoothing
  useEffect(() => {
    if (!activeId || !sidebarRef.current) return;

    cancelAnimationFrame(rafRef.current!);

    rafRef.current = requestAnimationFrame(() => {
      const linkEl = sidebarRef.current!.querySelector<HTMLAnchorElement>(`a[href="#${activeId}"]`);
      if (!linkEl) return;

      const rect = linkEl.getBoundingClientRect();
      const sidebarRect = sidebarRef.current!.getBoundingClientRect();
      const y = rect.top - sidebarRect.top;
      setIndicatorY(y);
    });

    return () => cancelAnimationFrame(rafRef.current!);
  }, [activeId]);

  if (!clientHeadings?.length) return null;

  return (
    <aside className="hidden xl:block fixed right-20 xl:right-48 top-48 w-64">
      <div className="relative pl-6">
        {/* Background for the scrollbar */}
        <div className="absolute left-0 top-0 w-[2px] h-full bg-muted" />

        {/* Moving highlight bar with subtle transition */}
        <div
          className="absolute left-0 w-[2px] bg-brand transition-transform duration-150 ease-out"
          style={{
            transform: `translateY(${indicatorY}px)`,
            height: '20px',
          }}
        />

        {/* Headings list */}
        <nav ref={sidebarRef} className="flex flex-col gap-3 max-h-[70vh] overflow-auto">
          <p className="font-semibold">On this page</p>
          {clientHeadings.map((h, idx) =>
            idx === 0 ? null : (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(h.id);
                  el?.scrollIntoView({ block: 'start' });
                  setActiveId(h.id);
                }}
                className={`block truncate transition-colors ${
                  activeId === h.id ? 'text-muted-highlights' : 'text-muted-foreground'
                } ${h.level === 3 ? 'pl-6' : ''}`}
              >
                {h.text}
              </a>
            ),
          )}
        </nav>
      </div>
    </aside>
  );
}
