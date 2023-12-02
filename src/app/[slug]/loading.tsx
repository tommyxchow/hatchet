export default function StoryListLoadingSkeleton() {
  return (
    <div className='flex flex-col gap-8'>
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className='h-16 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800'
        />
      ))}
    </div>
  );
}
