import { HNClient } from '@/lib/hnClient';
import { HNFeedType, HNFeedTypes, RouteParams } from '@/lib/types';
import Link from 'next/link';

const hnClient = new HNClient();

export default async function Stories({ params, searchParams }: RouteParams) {
  const feedType = (params.slug || 'top') as HNFeedType;
  const pageNumber = parseInt(searchParams.p as string) || 1;
  const stories = await hnClient.fetchStories(feedType, pageNumber);

  return (
    <article>
      <div className='py-16'>
        <Link href='/'>
          <h1 className='text-2xl font-bold'>
            Hatchet <span className='text-hn'>News</span>
          </h1>
        </Link>
      </div>

      <section className='flex flex-col gap-8'>
        <nav>
          <ul className='flex gap-4 text-lg font-semibold'>
            {HNFeedTypes.map((type) => (
              <li key={type}>
                <Link href={`/${type}`}>
                  <h2 className={type === feedType ? '' : 'text-neutral-400'}>
                    {type}
                  </h2>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ol className='flex flex-col gap-8'>
          {stories.map((story) => (
            <li key={story.id}>
              <article className='flex flex-col gap-2'>
                <h3 className='font-semibold'>{story.title}</h3>
                <div className='flex gap-4 text-sm font-medium text-neutral-400'>
                  <p>{story.score} points</p>
                  <p> {story.descendants} comments</p>
                  <p>by {story.by}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <nav className='grid grid-cols-2 font-semibold'>
          {pageNumber > 1 && (
            <Link className='' href={`/${feedType}?p=${pageNumber - 1}`}>
              Previous
            </Link>
          )}
          {stories.length == 30 && (
            <Link
              className='col-start-2 justify-self-end'
              href={`/${feedType}?p=${pageNumber + 1}`}
            >
              Next
            </Link>
          )}
        </nav>
      </section>
    </article>
  );
}
