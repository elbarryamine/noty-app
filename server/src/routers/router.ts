import trpc from '../config/trpc';
import { noteRouter } from './note/noteRouter';
import { userRouter } from './user/userRouter';

export const appRouter = trpc.router({
  note: noteRouter,
  user: userRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
