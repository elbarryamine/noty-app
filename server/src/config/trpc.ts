import { initTRPC } from '@trpc/server';

import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import * as jwt from 'jsonwebtoken';

export async function createContext({ req }: trpcNext.CreateNextContextOptions) {
  const token = (req?.headers?.authorization ?? '').split(' ')[1];
  console.log(token);
  if (token) {
    const userDecoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number };
    return { id: userDecoded.id };
  }
  return { id: null };
}

type Context = inferAsyncReturnType<typeof createContext>;
const trpc = initTRPC.context<Context>().create();

export default trpc;
