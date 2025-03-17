'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';

export function ThemeSelect() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className='size-8' />;

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <button
      className='animate-in fade-in rounded-sm border border-neutral-200 p-2 text-sm transition-colors hover:bg-neutral-200 dark:border-neutral-800 dark:hover:bg-neutral-800'
      aria-label={`Toggle ${isDarkMode ? 'light mode' : 'dark mode'}`}
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
    >
      {isDarkMode ? <HiSun /> : <HiMoon />}
    </button>
  );
}
