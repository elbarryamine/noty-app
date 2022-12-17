import * as express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from './trpc';
import { appRouter } from './trpc';
import * as cors from 'cors';

const app = express();
app.use(cors({ origin: '*' }));

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
app.listen(8080, '', () => console.log('listen at port 8080'));
