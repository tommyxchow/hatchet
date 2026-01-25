'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

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

  const { data: thumbnailUrl } = useQuery({
    queryKey: ['thumbnail', url],
    queryFn: () => fetchThumbnailUrl(url),
    enabled: isVisible,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  const hasImage = thumbnailUrl != null && !imgError;

  return (
    <div
      ref={containerRef}
      className='flex size-full items-center justify-center'
    >
      {thumbnailUrl != null && !imgError ? (
        <Image
          className={`size-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          src={thumbnailUrl}
          alt={alt}
          fill
          sizes='(max-width: 640px) 72px, 96px'
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
      ) : null}
      {/* Show placeholder when no image or still loading */}
      <ExternalLink
        className={`text-muted-foreground absolute size-6 transition-opacity duration-300 ${hasImage && imgLoaded ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
}
