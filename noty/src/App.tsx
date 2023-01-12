import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NativeBaseProvider} from 'native-base';
import React, {useState} from 'react';
import Navigation from '@navigation/Navigation';
import {useTrpc, trpc} from '@shared/utils/trpc/trpc';
import {useUserStore} from '@shared/store/user';

const App = () => {
  const token = useUserStore(state => state.token);
  const [queryClient] = useState(() => new QueryClient());
  const {trpcClient} = useTrpc(token ?? undefined);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <Navigation />
          </QueryClientProvider>
        </trpc.Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
