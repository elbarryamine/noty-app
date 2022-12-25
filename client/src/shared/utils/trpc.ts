import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../../server/src/routers/router';

export const trpc = createTRPCReact<AppRouter>();
