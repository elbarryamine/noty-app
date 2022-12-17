import { inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
declare const router: <TProcRouterRecord extends import("@trpc/server").ProcedureRouterRecord>(procedures: TProcRouterRecord) => import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {};
    meta: {};
    errorShape: never;
    transformer: import("@trpc/server").CombinedDataTransformer;
}>, TProcRouterRecord>;
declare const middleware: <TNewParams extends import("@trpc/server").ProcedureParams<import("@trpc/server").AnyRootConfig, unknown, unknown, unknown, unknown, unknown, unknown>>(fn: import("@trpc/server").MiddlewareFunction<{
    _config: import("@trpc/server").RootConfig<{
        ctx: {};
        meta: {};
        errorShape: never;
        transformer: import("@trpc/server").CombinedDataTransformer;
    }>;
    _ctx_out: {};
    _input_out: unknown;
    _input_in: unknown;
    _output_in: unknown;
    _output_out: unknown;
    _meta: {};
}, TNewParams>) => import("@trpc/server").MiddlewareFunction<{
    _config: import("@trpc/server").RootConfig<{
        ctx: {};
        meta: {};
        errorShape: never;
        transformer: import("@trpc/server").CombinedDataTransformer;
    }>;
    _ctx_out: {};
    _input_out: unknown;
    _input_in: unknown;
    _output_in: unknown;
    _output_out: unknown;
    _meta: {};
}, TNewParams>;
declare const publicProcedure: import("@trpc/server").ProcedureBuilder<{
    _config: import("@trpc/server").RootConfig<{
        ctx: {};
        meta: {};
        errorShape: never;
        transformer: import("@trpc/server").CombinedDataTransformer;
    }>;
    _ctx_out: {};
    _input_in: typeof import("@trpc/server").unsetMarker;
    _input_out: typeof import("@trpc/server").unsetMarker;
    _output_in: typeof import("@trpc/server").unsetMarker;
    _output_out: typeof import("@trpc/server").unsetMarker;
    _meta: {};
}>;
declare const createContext: ({ req, res }: trpcExpress.CreateExpressContextOptions) => {};
declare const appRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {};
    meta: {};
    errorShape: never;
    transformer: import("@trpc/server").CombinedDataTransformer;
}>, {
    notes: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {};
            meta: {};
            errorShape: never;
            transformer: import("@trpc/server").CombinedDataTransformer;
        }>;
        _ctx_out: {};
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
        _meta: {};
    }, string>;
}>;
export type AppRouter = typeof appRouter;
export type Context = inferAsyncReturnType<typeof createContext>;
export { appRouter, router, middleware, publicProcedure, createContext };
