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

  // DuckDuckGo's favicon service has better transparency handling
  return (
    <Image
      className='size-3 object-contain'
      src={`https://icons.duckduckgo.com/ip3/${hostname}.ico`}
      alt=''
      width={12}
      height={12}
      unoptimized
      onError={() => setError(true)}
    />
  );
}
