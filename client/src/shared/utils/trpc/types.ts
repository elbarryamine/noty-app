import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '../../../../../server/src/routers/router';

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;

// Input
export type NoteCreate = RouterInput['note']['create'];

// Response
export type NoteGet = RouterOutput['note']['get'];
