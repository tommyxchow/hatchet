import { getThumbnailUrl } from '@/lib/utils';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'Missing url parameter' },
      { status: 400 },
    );
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
  }

  const thumbnailUrl = await getThumbnailUrl(url);

  return NextResponse.json(
    { thumbnailUrl },
    {
      headers: {
        // Cache for 1 hour on CDN, 1 day stale-while-revalidate
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    },
  );
}
