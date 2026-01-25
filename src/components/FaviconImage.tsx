'use client';

import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export function FaviconImage({
  src,
  alt,
}: {
  src: string | null;
  alt: string;
}) {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src || imgError) {
    return <ExternalLink className='text-muted-foreground size-6' />;
  }

  return (
    <Image
      className={`object-contain ${isLoaded ? 'animate-in fade-in' : 'opacity-0'}`}
      src={src}
      alt={alt}
      width={64}
      height={64}
      unoptimized
      onError={() => setImgError(true)}
      onLoad={() => setIsLoaded(true)}
    />
  );
}
