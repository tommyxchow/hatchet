import Providers from '@/components/Providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'hatchet news',
  description: 'An alternative hacker news web client.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} mx-auto min-h-screen max-w-screen-md bg-black px-4 pb-4 text-neutral-100 lg:px-0 lg:pb-8`}
      >
        <header className='py-8'>
          <Link href='/'>
            <h1 className='text-2xl font-bold'>
              hatchet <span className='text-hn'>news</span>
            </h1>
          </Link>
        </header>

        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
