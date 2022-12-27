export declare const noteRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        user: {
            id: number;
        };
    };
    meta: object;
    errorShape: never;
    transformer: import("@trpc/server").DataTransformerOptions;
}>, {
    get: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                user: {
                    id: number;
                };
            };
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: import("@trpc/server").Overwrite<{
            user: {
                id: number;
            };
        }, {
            user: import(".prisma/client").User;
        }>;
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import(".prisma/client").Note[]>;
    create: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                user: {
                    id: number;
                };
            };
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: import("@trpc/server").Overwrite<{
            user: {
                id: number;
            };
        }, {
            user: import(".prisma/client").User;
        }>;
        _input_in: {
            text?: string;
            title?: string;
            color?: string;
        };
        _input_out: {
            text?: string;
            title?: string;
            color?: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import(".prisma/client").Note>;
    delete: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                user: {
                    id: number;
                };
            };
            meta: object;
            errorShape: never;
            transformer: import("@trpc/server").DataTransformerOptions;
        }>;
        _meta: object;
        _ctx_out: import("@trpc/server").Overwrite<{
            user: {
                id: number;
            };
        }, {
            user: import(".prisma/client").User;
        }>;
        _input_in: {
            id?: number;
        };
        _input_out: {
            id?: number;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, void>;
}>;
