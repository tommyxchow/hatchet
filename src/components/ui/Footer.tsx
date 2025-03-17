export function Footer() {
  return (
    <footer className='text-center text-sm text-neutral-400 underline-offset-2 dark:text-neutral-500'>
      <p>
        Designed and developed by{' '}
        <a
          className='underline'
          href='https://www.tommychow.com/'
          target='_blank'
        >
          Tommy Chow
        </a>{' '}
        (
        <a
          className='underline'
          href='https://github.com/tommyxchow/hatchet'
          target='_blank'
        >
          GitHub
        </a>
        )
      </p>
    </footer>
  );
}
