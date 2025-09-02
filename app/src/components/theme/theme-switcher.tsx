'use client';

import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // Prevent hydration mismatch

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <Button
      variant="theme"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full bg-transparent"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <MoonIcon className="h-10 w-10 transition-all" />
      ) : (
        <SunIcon className="h-10 w-10 transition-all" />
      )}
    </Button>
  );
}
