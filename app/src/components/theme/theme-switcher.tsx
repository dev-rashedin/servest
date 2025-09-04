'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiMoon, IoSunnyOutline } from '@/data/icons';
import { Button } from '@/components/ui/button';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <Button
        variant="theme"
        size="icon"
        className="rounded-full bg-transparent"
        aria-label="Toggle theme"
      >
        <FiMoon />
      </Button>
    );
  }

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <Button
      variant="theme"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full bg-transparent"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <FiMoon /> : <IoSunnyOutline />}
    </Button>
  );
}
