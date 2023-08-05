import StoryTile from '@/components/ui/StoryTile';
import { HNClient } from '@/lib/hnClient';
import { RouteParams } from '@/lib/types';

const hnClient = new HNClient();

export default async function ItemPage({ params, searchParams }: RouteParams) {
  const itemId = parseInt(params.slug);

  const story = await hnClient.fetchItem(itemId);
  const comments = await hnClient.fetchComments(itemId);

  return (
    <article className='flex flex-col gap-8'>
      <section>
        <StoryTile story={story} />
      </section>

      <section className='flex flex-col gap-4'>
        <h2 className='font-semibold'>Comments</h2>
        <ul className='flex flex-col gap-8'>
          {comments.map(
            (comment) =>
              comment.text && (
                <li key={comment.id}>
                  <div
                    className='flex flex-col gap-4'
                    dangerouslySetInnerHTML={{ __html: comment.text }}
                  />
                </li>
              ),
          )}
        </ul>
      </section>
    </article>
  );
}
