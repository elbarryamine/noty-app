import React, { ReactNode } from 'react';
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '../utils/trpc';

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:8080/trpc',
      // optional
      headers() {
        return { authorization: '' };
      },
    }),
  ],
});

const TrpcProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default TrpcProvider;
