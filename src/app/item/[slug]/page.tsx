import Comments from '@/components/ui/Comments';
import StoryTile from '@/components/ui/StoryTile';
import { HNClient } from '@/lib/hnClient';
import { RouteParams } from '@/lib/types';

export const revalidate = 60 * 5;

const hnClient = new HNClient();

export default async function ItemPage({ params }: RouteParams) {
  const itemId = parseInt(params.slug);

  const getStory = hnClient.fetchItem(itemId);
  const getComments = hnClient.fetchCommentsWithParser(itemId);

  const [story, comments] = await Promise.all([getStory, getComments]);

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
