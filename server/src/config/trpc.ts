import { initTRPC, TRPCError } from '@trpc/server';

import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import * as jwt from 'jsonwebtoken';

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  try {
    const secret = process.env.JWT_SECRET as jwt.Secret;
    const token: string = (req?.headers?.authorization ?? '').split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, secret) as { id: string };
      return { user: decoded && decoded.id ? { id: decoded.id } : null };
    }
    return { user: null };
  } catch {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'invalid authorization header',
    });
  }
}

type Context = inferAsyncReturnType<typeof createContext>;
const trpc = initTRPC.context<Context>().create();

export default trpc;
