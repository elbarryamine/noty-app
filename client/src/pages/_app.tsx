import type { AppProps } from 'next/app';
import AuthProvider from '@shared/providers/AuthProvider';
import { trpc, useTrpc } from '../shared/utils/trpc/trpc';
import '@styles/tailwind.scrollist.css';
import '@styles/tailwind.typography.css';
import '@styles/tailwind.button.css';
import '@styles/tailwind.form.css';
import '@styles/tailwind.css';
import '@styles/tailwind.loaders.css';
import '@styles/tailwind.skeleton.css';
import '@styles/alertdialog.css';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserStore } from '@store/user';

const App = ({ Component, pageProps }: AppProps) => {
  const token = useUserStore((state) => state.token);
  const [queryClient] = useState(() => new QueryClient());
  const { trpcClient } = useTrpc(token ?? undefined);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
