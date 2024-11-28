export function StoryListSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className='h-28 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800'
        />
      ))}
    </div>
  );
}
