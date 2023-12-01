import { ItemText } from '@/components/ui/ItemText';
import { HNClient } from '@/lib/hnClient';
import { type RouteParams } from '@/lib/types';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

export default async function User({ searchParams }: RouteParams) {
  console.log(searchParams);
  const userId = searchParams.id;

  if (!userId || typeof userId !== 'string') {
    throw Error('Invalid user id');
  }

  const user = await HNClient.fetchUserById(userId);

  if (!user) notFound();

  return (
    <article className='flex flex-col gap-4'>
      <div>
        <h3 className='text-xl font-semibold'>{user.id}</h3>
        <time className='text-neutral-400'>
          joined on {new Date(user.created * 1000).toLocaleDateString()}
        </time>
        {user.karma && (
          <p className='text-neutral-400'>
            {user.karma.toLocaleString()} karma
          </p>
        )}
      </div>

      {user.about && <ItemText text={user.about} />}
    </article>
  );
}
