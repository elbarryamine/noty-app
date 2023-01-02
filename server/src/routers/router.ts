import trpc from '../config/trpc';
import { folderRouter } from './folder/folderRouter';
import { noteRouter } from './note/noteRouter';
import { userRouter } from './user/userRouter';

export const appRouter = trpc.router({
  note: noteRouter,
  user: userRouter,
  folder: folderRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
