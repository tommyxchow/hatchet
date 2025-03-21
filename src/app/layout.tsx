import { Providers } from '@/components/Providers';
import { FeedTypeNavBar } from '@/components/ui/FeedTypeNavBar';
import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/Header';
import type { Metadata } from 'next';
import { Host_Grotesk, JetBrains_Mono } from 'next/font/google';
import { twJoin } from 'tailwind-merge';
import './globals.css';

const fontSans = Host_Grotesk({
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-sans',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hatchetnews.vercel.app/'),
  title: 'Hatchet News',
  description: 'A fast, modern, and simple web client for Hacker News.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={twJoin(
          'mx-auto flex min-h-screen max-w-3xl flex-col gap-2 bg-neutral-50 px-4 font-sans text-neutral-800 lg:px-0 dark:bg-black dark:text-neutral-100',
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <Providers>
          <Header />

          <main className='flex grow flex-col gap-2'>
            <FeedTypeNavBar />

            {children}
          </main>

          <div className='pt-8 pb-4'>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
