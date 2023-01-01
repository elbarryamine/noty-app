import type { AppProps } from 'next/app';
import AuthProvider from '@shared/providers/AuthProvider';
import { trpc, useTrpc } from '../shared/utils/trpc/trpc';
import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserStore } from '@store/user';
import dynamic from 'next/dynamic';
import useCloudReminderToast from '@shared/hooks/useCloudReminderToast';
// import Chakra from '@shared/providers/ChakraProvider';

const Chakra = dynamic(() => import('@shared/providers/ChakraProvider'));

const App = ({ Component, pageProps }: AppProps) => {
  useCloudReminderToast();
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
};

const Providers = ({ children }: { children: ReactNode }) => {
  const token = useUserStore((state) => state.token);
  const [queryClient] = useState(() => new QueryClient());
  const { trpcClient } = useTrpc(token ?? undefined);

  return (
    <Chakra>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </Chakra>
  );
};

export default App;
