import Comments from '@/components/ui/Comments';
import StoryTile from '@/components/ui/StoryTile';
import { HNClient } from '@/lib/hnClient';
import { RouteParams } from '@/lib/types';

const hnClient = new HNClient();

export default async function ItemPage({ params, searchParams }: RouteParams) {
  const itemId = parseInt(params.slug);

  const story = await hnClient.fetchItem(itemId);
  const comments = await hnClient.fetchCommentsWithParser(itemId);

  return (
    <article className='flex flex-col gap-8'>
      <section>
        <StoryTile story={story} />
      </section>

      <section className='flex flex-col gap-4'>
        <h2 className='font-semibold'>comments</h2>
        <Comments comments={comments} />
      </section>
    </article>
  );
}
