import * as trpcNext from '@trpc/server/adapters/next';
export declare function createContext({ req }: trpcNext.CreateNextContextOptions): Promise<{
    id?: number;
}>;
declare const trpc: {
    _config: import("@trpc/server").RootConfig<{
        ctx: {
            id?: number;
        };
        meta: object;
        errorShape: never;
        transformer: import("@trpc/server").DataTransformerOptions;
    }>;
    procedure: import("@trpc/server").ProcedureBuilder<{
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                id?: number;
            };
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _ctx_out: {
            id?: number;
        };
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
        _meta: object;
    }>;
    middleware: <TNewParams extends import("@trpc/server").ProcedureParams<import("@trpc/server").AnyRootConfig, unknown, unknown, unknown, unknown, unknown, unknown>>(fn: import("@trpc/server").MiddlewareFunction<{
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                id?: number;
            };
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _ctx_out: {
            id?: number;
        };
        _input_out: unknown;
        _input_in: unknown;
        _output_in: unknown;
        _output_out: unknown;
        _meta: object;
    }, TNewParams>) => import("@trpc/server").MiddlewareFunction<{
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                id?: number;
            };
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _ctx_out: {
            id?: number;
        };
        _input_out: unknown;
        _input_in: unknown;
        _output_in: unknown;
        _output_out: unknown;
        _meta: object;
    }, TNewParams>;
    router: <TProcRouterRecord extends import("@trpc/server").ProcedureRouterRecord>(procedures: TProcRouterRecord) => import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            id?: number;
        };
        meta: object;
        errorShape: never;
        transformer: import("@trpc/server").DataTransformerOptions;
    }>, TProcRouterRecord>;
    mergeRouters: typeof import("@trpc/server").mergeRoutersGeneric;
};
export default trpc;
