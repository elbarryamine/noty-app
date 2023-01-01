import trpc from '../config/trpc';
import { categoryRouter } from './category/categoryRouter';
import { noteRouter } from './note/noteRouter';
import { userRouter } from './user/userRouter';

export const appRouter = trpc.router({
  note: noteRouter,
  user: userRouter,
  category: categoryRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
