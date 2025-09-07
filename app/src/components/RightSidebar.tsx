'use client';
import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function RightSidebar({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Scroll spy: highlight active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }, // triggers slightly before center
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <aside className="hidden xl:block fixed bg-white right-12 top-24 w-60">
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute right-0 top-0 h-full w-[2px] bg-gray-200">
          <div className="bg-brand w-full" style={{ height: `${progress}%` }}></div>
        </div>

        {/* Headings nav */}
        <nav className="flex flex-col gap-2 pr-4">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`pl-${(h.level - 2) * 4} text-sm hover:underline ${
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
