import { HNClient, HNFeedType } from '@/lib/hnClient';
import { RouteParams } from '@/lib/types';

const hnClient = new HNClient();

export default async function Stories({ params, searchParams }: RouteParams) {
  const feedType = (params.slug || 'top') as HNFeedType;
  const pageNumber = parseInt(searchParams.p as string) || 1;
  const stories = await hnClient.fetchStories(feedType, pageNumber);

  return (
    <article>
      <div className='py-28'>
        <h1 className='text-2xl font-bold'>
          Hatchet <span className='text-hn'>News</span>
        </h1>
      </div>

      <section className='flex flex-col gap-12'>
        {/* <nav>
          <ul className='flex gap-4 text-lg font-semibold'>
            <h2>Top</h2>
            <h2>Best</h2>
            <h2>New</h2>
          </ul>
        </nav> */}

        <ol className='flex flex-col gap-12'>
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
      </section>
    </article>
  );
}
