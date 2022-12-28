import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import { useEffect, useState } from 'react';
import type { AppRouter } from '../../../../../server/src/routers/router';

export const trpc = createTRPCReact<AppRouter>();
export const useTrpc = (token?: string) => {
  const [trpcClient, setTrpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trpc` })],
    })
  );

  useEffect(() => {
    setTrpcClient(
      trpc.createClient({
        links: [
          httpBatchLink({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trpc`,
            headers: { Authorization: token ? `Bearer ${token}` : '' },
          }),
        ],
      })
    );
  }, [token]);
  return { trpcClient };
};
