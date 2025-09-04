// components/InlineHighlight.tsx
export default function InlineHighlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-yellow-100 dark:bg-yellow-800 rounded px-1.5 py-0.5 font-medium">
      {children}
    </span>
  );
}
