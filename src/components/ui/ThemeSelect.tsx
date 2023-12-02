'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';

export default function ThemeSelect() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {mounted && (
        <div className='flex gap-2'>
          <button
            className={twJoin(theme == 'light' && 'font-semibold')}
            onClick={() => setTheme('light')}
          >
            light
          </button>
          <button
            className={twJoin(theme == 'dark' && 'font-semibold')}
            onClick={() => setTheme('dark')}
          >
            dark
          </button>
        </div>
      )}
    </div>
  );
}
