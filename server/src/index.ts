import * as express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import * as cors from 'cors';
import { appRouter } from './routers/router';
import * as dotenv from 'dotenv';
import { createContext } from './config/trpc';

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));

app.use(
  '/api/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

const PORT = Number(process.env.PORT) || 8080;
// eslint-disable-next-line no-console
app.listen(PORT, '', () => console.log(`listen at port ${PORT}`));
