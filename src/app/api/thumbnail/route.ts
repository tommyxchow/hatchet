import { getThumbnailUrl } from '@/lib/utils'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')

  if (url == null || url === '') {
    return NextResponse.json(
      { error: 'Missing url parameter', thumbnailUrl: null },
      { status: 400 },
    )
  }

  // Validate it's a proper URL
  let parsedUrl: URL
  try {
    parsedUrl = new URL(url)
  } catch {
    return NextResponse.json(
      { error: 'Invalid url', thumbnailUrl: null },
      { status: 400 },
    )
  }

  // Only allow http/https
  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    return NextResponse.json(
      { error: 'Invalid protocol', thumbnailUrl: null },
      { status: 400 },
    )
  }

  const thumbnailUrl = await getThumbnailUrl(url)

  return NextResponse.json(
    { thumbnailUrl },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    },
  )
}
