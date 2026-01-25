'use client';

import { Globe } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface FaviconProps {
  hostname: string;
}

export function Favicon({ hostname }: FaviconProps) {
  const [error, setError] = useState(false);

  if (error) {
    return <Globe className='size-3' />;
  }

  return (
    <Image
      className='size-3 object-contain'
      src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=32`}
      alt=''
      width={12}
      height={12}
      unoptimized
      onError={() => setError(true)}
    />
  );
}
