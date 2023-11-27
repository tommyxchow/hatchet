export default function Loading() {
  return (
    <div className='flex flex-col gap-8'>
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className='h-16 animate-pulse rounded-lg bg-neutral-900' />
      ))}
    </div>
  );
}
