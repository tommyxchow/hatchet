export function StoryListSkeleton() {
  return (
    <div className='flex flex-col gap-2'>
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className='h-24 animate-pulse rounded-xl bg-muted'
        />
      ))}
    </div>
  );
}
