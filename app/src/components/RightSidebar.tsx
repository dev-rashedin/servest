'use client';
import { useSidebar } from './SidebarToggleContext';

export default function RightSidebar({ clientHeadings }: { clientHeadings: Heading[] }) {
  const { rightSidebarOpen, setRightSidebarOpen } = useSidebar();

  if (!clientHeadings?.length) return null;

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed inset-0 lg:hidden z-50 bg-background/70 backdrop-blur-sm ${
        rightSidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      onClick={() => setRightSidebarOpen(false)}
    >
      <div
        className={`absolute left-0 right-0 bottom-0 bg-sidebar p-6 rounded-t-2xl shadow-lg overflow-y-auto max-h-[75vh] transform transition-transform duration-300 ease-in-out ${
          rightSidebarOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-sm">On this page</p>
          <button onClick={handleBackToTop} className="text-xs text-brand underline">
            Back to top
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          {clientHeadings.map((h, idx) =>
            idx === 0 ? null : (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(h.id);
                  el?.scrollIntoView({ block: 'start' });
                  setRightSidebarOpen(false);
                }}
                className={`block truncate text-sm ${
                  h.level === 3 ? 'pl-4 text-muted-foreground' : 'text-muted-highlights'
                }`}
              >
                {h.text}
              </a>
            ),
          )}
        </nav>
      </div>
    </div>
  );
}
