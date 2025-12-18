import { ItemText } from '@/components/ItemText';
import { HNClient } from '@/lib/hnClient';
import { notFound } from 'next/navigation';

export default async function User({ searchParams }: PageProps<'/user'>) {
  const { id: userId } = await searchParams;

  if (typeof userId !== 'string' || !userId) {
    throw Error('Invalid user id');
  }

  const user = await HNClient.fetchUserById(userId);

  if (!user) notFound();

  const joinDate = new Date(user.created * 1000);

  return (
    <article className='flex flex-col gap-4'>
      <div className='font-medium'>
        <h3 className='text-lg font-semibold'>{user.id}</h3>
        <time
          className='text-muted-foreground'
          dateTime={joinDate.toISOString()}
        >
          joined on {joinDate.toLocaleDateString()}
        </time>
        {user.karma > 0 && (
          <p className='text-muted-foreground'>
            {user.karma.toLocaleString()} karma
          </p>
        )}
      </div>

      {user.about && <ItemText text={user.about} />}
    </article>
  );
}
