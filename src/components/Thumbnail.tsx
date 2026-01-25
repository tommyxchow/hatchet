'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Skeleton } from './ui/skeleton';

interface ThumbnailProps {
  url: string;
  alt: string;
}

interface ThumbnailResponse {
  thumbnailUrl: string | null;
}

async function fetchThumbnailUrl(url: string): Promise<string | null> {
  const response = await fetch(`/api/thumbnail?url=${encodeURIComponent(url)}`);
  if (!response.ok) return null;
  const data = (await response.json()) as ThumbnailResponse;
  return data.thumbnailUrl;
}

export function Thumbnail({ url, alt }: ThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isVisible = useIntersectionObserver(containerRef, {
    rootMargin: '100px',
    once: true,
  });

  const {
    data: thumbnailUrl,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ['thumbnail', url],
    queryFn: () => fetchThumbnailUrl(url),
    enabled: isVisible,
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });

  const hasValidThumbnail = thumbnailUrl != null && !imgError;
  const showSkeleton =
    !isVisible || isLoading || (hasValidThumbnail && !imgLoaded);
  const showFallback = isFetched && !hasValidThumbnail;

  return (
    <div
      ref={containerRef}
      className='flex size-full items-center justify-center'
    >
      {hasValidThumbnail && (
        <Image
          className={`size-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          src={thumbnailUrl}
          alt={alt}
          fill
          sizes='(max-width: 640px) 72px, 96px'
          unoptimized
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
      )}
      {showSkeleton && <Skeleton className='absolute inset-0 rounded-none' />}
      {showFallback && (
        <ExternalLink className='text-muted-foreground size-6' />
      )}
    </div>
  );
}
