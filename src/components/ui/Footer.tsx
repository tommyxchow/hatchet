export function Footer() {
  return (
    <div className='text-sm text-neutral-400 underline-offset-2 dark:text-neutral-500'>
      <p>
        designed and developed by{' '}
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
          source
        </a>
        )
      </p>
    </div>
  );
}
