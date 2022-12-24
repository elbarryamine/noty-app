import { inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();
// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
export const appRouter = router({
  note: procedure.query(() => {
    return {
      note: `hello`,
    };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
