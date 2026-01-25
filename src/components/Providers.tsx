'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data stays fresh for 5 minutes - reduces unnecessary refetches
        staleTime: 5 * 60 * 1000,
        // Cache data for 30 minutes
        gcTime: 30 * 60 * 1000,
        // Disable automatic refetching to reduce CPU usage
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        // Only retry once on failure
        retry: 1,
      },
    },
  });
}

// Ensure we create a new QueryClient for each request on the server
// but reuse the same client on the browser
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always create a new client
    return makeQueryClient();
  } else {
    // Browser: reuse the same client
    browserQueryClient ??= makeQueryClient();
    return browserQueryClient;
  }
}

export function Providers({ children }: ProvidersProps) {
  // eslint-disable-next-line @eslint-react/naming-convention/use-state
  const [queryClient] = useState(getQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute='class' disableTransitionOnChange>
        {children}
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
