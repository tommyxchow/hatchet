import { Providers } from '@/components/Providers';
import { FeedTypeNavBar } from '@/components/FeedTypeNavBar';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Host_Grotesk, JetBrains_Mono } from 'next/font/google';
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
        className={cn(
          'mx-auto flex min-h-screen max-w-3xl flex-col gap-2 bg-background px-4 font-sans text-foreground lg:px-0',
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
