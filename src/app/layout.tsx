import { Providers } from '@/components/Providers';
import { FeedTypeNavBar } from '@/components/ui/FeedTypeNavBar';
import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/Header';
import type { Metadata } from 'next';
import { JetBrains_Mono, Schibsted_Grotesk } from 'next/font/google';
import { twJoin } from 'tailwind-merge';
import './globals.css';

const fontSans = Schibsted_Grotesk({
  subsets: ['latin'],
  style: ['normal', 'italic'],
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
          'mx-auto flex min-h-screen max-w-screen-md flex-col bg-neutral-50 px-4 font-sans text-neutral-900 dark:bg-black dark:text-neutral-100 lg:px-0',
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <Header />

        <FeedTypeNavBar />

        <main className='grow'>
          <Providers>{children}</Providers>
        </main>

        <div className='pb-4 pt-8'>
          <Footer />
        </div>
      </body>
    </html>
  );
}
