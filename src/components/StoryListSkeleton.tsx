export function StoryListSkeleton() {
  return (
    <div className='flex flex-col gap-2'>
      {Array.from({ length: 30 }).map((_, index) => (
        // eslint-disable-next-line @eslint-react/no-array-index-key -- static placeholder rows
        <div key={index} className='bg-muted h-24 animate-pulse rounded-xl' />
      ))}
    </div>
  )
}
