import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '../../../../../server/src/routers/router';

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;

// Input
export type NoteCreateInput = RouterInput['note']['create'];

// Response
export type NoteGetResponse = RouterOutput['note']['get'];
export type CategoryGetResponse = RouterOutput['category']['get'];
export type CategoryGetByIdResponse = RouterOutput['category']['getById'];
