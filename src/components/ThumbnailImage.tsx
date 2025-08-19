'use client';

import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export function ThumbnailImage({
  src,
  alt,
}: {
  src: string | null;
  alt: string;
}) {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src || imgError) {
    return <ExternalLink className='size-6' />;
  }

  return (
    <Image
      className={`object-cover ${isLoaded ? 'animate-in fade-in' : 'opacity-0'}`}
      src={src}
      alt={alt}
      fill
      unoptimized
      onError={() => setImgError(true)}
      onLoad={() => setIsLoaded(true)}
    />
  );
}
