'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='flex flex-col items-center gap-4 py-12'>
      <div className='flex flex-col gap-2 text-center'>
        <h2 className='text-2xl font-semibold'>Something went wrong</h2>
        <p className='text-muted-foreground'>{error.message}</p>
        {error.digest && (
          <p className='text-muted-foreground text-xs'>
            Error ID: {error.digest}
          </p>
        )}
      </div>
      <Button onClick={reset} variant='outline'>
        Try again
      </Button>
    </div>
  );
}
