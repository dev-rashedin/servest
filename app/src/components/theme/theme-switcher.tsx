'use client';
import { useTheme } from 'next-themes';
import { JSX } from 'react';

export function ThemeSwitcher(): JSX.Element {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
}
