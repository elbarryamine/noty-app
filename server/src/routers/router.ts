import { noteRouter } from './note/noteRouter';
import { userRouter } from './user/userRouter';
import { router } from '../config/trpc';

export const appRouter = router({
  note: noteRouter,
  user: userRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
