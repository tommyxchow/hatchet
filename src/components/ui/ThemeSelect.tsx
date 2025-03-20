'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSelect() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className='size-8.5' />;

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <button
      className='animate-in fade-in rounded-md p-2 text-sm transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800'
      aria-label={`Toggle ${isDarkMode ? 'light mode' : 'dark mode'}`}
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
    >
      {isDarkMode ? (
        <SunIcon className='size-4' />
      ) : (
        <MoonIcon className='size-4' />
      )}
    </button>
  );
}
