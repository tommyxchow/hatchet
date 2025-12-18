import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { HNClient } from '@/lib/hnClient';
import { type HNFeedType } from '@/lib/types';
import { StoryTile } from './StoryTile';

interface StoryListProps {
  feedType: HNFeedType;
  pageNumber: number;
}

export async function StoryList({ feedType, pageNumber }: StoryListProps) {
  const stories = await HNClient.fetchStoriesByFeedType(feedType, pageNumber);

  return (
    <div className='flex flex-col gap-2'>
      <ol className='flex flex-col gap-2'>
        {stories.map((story) => (
          <li key={story.id}>
            <StoryTile story={story} />
          </li>
        ))}
      </ol>

      <Pagination>
        <PaginationContent className='flex w-full justify-between'>
          {/* Previous button - always on left edge */}
          <div className='flex'>
            {pageNumber > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`/${feedType}?p=${pageNumber - 1}`} />
              </PaginationItem>
            )}
          </div>

          {/* Page numbers in center */}
          <div className='flex items-center gap-1'>
            {pageNumber > 2 && (
              <PaginationItem>
                <PaginationLink href={`/${feedType}?p=1`}>1</PaginationLink>
              </PaginationItem>
            )}

            {pageNumber > 1 && (
              <PaginationItem>
                <PaginationLink href={`/${feedType}?p=${pageNumber - 1}`}>
                  {pageNumber - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink href={`/${feedType}?p=${pageNumber}`} isActive>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>

            {stories.length === 30 && (
              <PaginationItem>
                <PaginationLink href={`/${feedType}?p=${pageNumber + 1}`}>
                  {pageNumber + 1}
                </PaginationLink>
              </PaginationItem>
            )}
          </div>

          {/* Next button - always on right edge */}
          <div className='flex'>
            {stories.length === 30 && (
              <PaginationItem>
                <PaginationNext href={`/${feedType}?p=${pageNumber + 1}`} />
              </PaginationItem>
            )}
          </div>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
