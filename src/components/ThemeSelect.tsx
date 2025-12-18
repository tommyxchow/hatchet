'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSelect() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line -- intentional hydration pattern
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
      {isDarkMode ? <Sun className='size-4' /> : <Moon className='size-4' />}
    </Button>
  );
}
