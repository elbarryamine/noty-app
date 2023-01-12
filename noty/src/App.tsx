import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useState} from 'react';
import {View} from 'react-native';
import {useTrpc, trpc} from './shared/utils/trpc/trpc';
import {useUserStore} from './store/user';

const App = () => {
  const token = useUserStore(state => state.token);
  const [queryClient] = useState(() => new QueryClient());
  const {trpcClient} = useTrpc(token ?? undefined);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <View />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
