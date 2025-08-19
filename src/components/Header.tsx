import Link from 'next/link';
import { ThemeSelect } from './ThemeSelect';

export function Header() {
  return (
    <header className='flex justify-between gap-2 pt-8'>
      <Link href='/'>
        <h1 className='text-lg font-bold text-foreground transition-colors hover:text-muted-foreground'>
          <span className='text-orange-600 dark:text-orange-500'>Hatchet</span>{' '}
          News
        </h1>
      </Link>

      <ThemeSelect />
    </header>
  );
}
