import Providers from '@/components/Providers';
import { FeedTypeNavBar } from '@/components/ui/FeedTypeNavBar';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

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
        className={`${fontSans.variable} ${fontMono.variable} mx-auto min-h-screen max-w-screen-md bg-black px-4 pb-4 font-sans text-neutral-200 lg:px-0 lg:pb-8`}
      >
        <header className='flex flex-col gap-4 pt-8'>
          <Link href='/'>
            <h1 className='text-2xl font-bold'>
              hatchet <span className='text-hn'>news</span>
            </h1>
          </Link>
        </header>

        <FeedTypeNavBar />

        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
