export function StoryListSkeleton() {
  return (
    <div className='flex flex-col gap-2'>
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className='h-24.5 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800'
        />
      ))}
    </div>
  );
}
