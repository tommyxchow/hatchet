import Link from 'next/link';

export function Header() {
  return (
    <header className='flex flex-col gap-4 pt-8'>
      <Link href='/'>
        <h1 className='text-2xl font-bold'>
          hatchet <span className='text-hn'>news</span>
        </h1>
      </Link>
    </header>
  );
}
