'use client';

import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSelect() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className='size-9' />;

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <Button
      variant='ghost'
      size='icon'
      aria-label={`Toggle ${isDarkMode ? 'light mode' : 'dark mode'}`}
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
    >
      {isDarkMode ? (
        <SunIcon className='size-4' />
      ) : (
        <MoonIcon className='size-4' />
      )}
    </Button>
  );
}
