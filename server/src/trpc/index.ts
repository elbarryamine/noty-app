import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

const trpc = initTRPC.create();
const router = trpc.router;
const middleware = trpc.middleware;
const publicProcedure = trpc.procedure;
const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({}); // no context

const appRouter = router({
  notes: publicProcedure.query(() => 'hi'),
});

export type AppRouter = typeof appRouter;
export type Context = inferAsyncReturnType<typeof createContext>;
export { appRouter, router, middleware, publicProcedure, createContext };
