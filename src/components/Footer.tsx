export function Footer() {
  return (
    <footer className='text-muted-foreground text-center text-sm underline-offset-2'>
      <p>
        Made by{' '}
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
