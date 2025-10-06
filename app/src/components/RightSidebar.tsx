'use client';
import { useSidebar } from './SidebarToggleContext';

export default function RightSidebar({ clientHeadings }: { clientHeadings: Heading[] }) {
  const { setRightSidebarOpen } = useSidebar();

  if (!clientHeadings?.length) return null;

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setRightSidebarOpen(false);
  };

  return (
    <div className="p-2 md:px-6 lg:p-2">
      <div className="pb-2 mb-4 border-b border-c-docs">
        <button onClick={handleBackToTop} className="text-brand">
          Back to top
        </button>
      </div>

      <nav className="flex flex-col gap-4">
        {clientHeadings.map((h, idx) =>
          idx === 0 ? null : (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(h.id)
                  ?.scrollIntoView({ block: 'start', behavior: 'smooth' });
                setRightSidebarOpen(false);
              }}
              className={`block truncate text-[13px] ${
                h.level === 3 ? 'pl-4 text-muted-foreground' : 'text-muted-highlights'
              }`}
            >
              {h.text}
            </a>
          ),
        )}
      </nav>
    </div>
  );
}
