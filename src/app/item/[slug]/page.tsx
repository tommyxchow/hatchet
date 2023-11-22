import Comments from '@/components/ui/Comments';
import StoryTile from '@/components/ui/StoryTile';
import { HNClient } from '@/lib/hnClient';
import { RouteParams } from '@/lib/types';

export const revalidate = 60 * 5;

export default async function ItemPage({ params }: RouteParams) {
  const itemId = parseInt(params.slug);

  const item = await HNClient.fetchItem(itemId);

  return (
    <article className='flex flex-col gap-8'>
      <section>
        <StoryTile story={item} />
      </section>

      <section className='flex flex-col gap-4'>
        <h2 className='font-semibold'>comments</h2>

        {item.kids && <Comments ids={item.kids} />}
      </section>
    </article>
  );
}
