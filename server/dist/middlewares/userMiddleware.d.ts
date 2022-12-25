export declare const isUser: import("@trpc/server").MiddlewareFunction<{
    _config: import("@trpc/server").RootConfig<{
        ctx: {
            id: number;
        };
        meta: object;
        errorShape: never;
        transformer: import("@trpc/server").DataTransformerOptions;
    }>;
    _ctx_out: {
        id: number;
    };
    _input_out: unknown;
    _input_in: unknown;
    _output_in: unknown;
    _output_out: unknown;
    _meta: object;
}, {
    _config: import("@trpc/server").RootConfig<{
        ctx: {
            id: number;
        };
        meta: object;
        errorShape: never;
        transformer: import("@trpc/server").DataTransformerOptions;
    }>;
    _ctx_out: {
        id: number;
        user: import(".prisma/client").User;
    };
    _input_in: unknown;
    _input_out: unknown;
    _output_in: unknown;
    _output_out: unknown;
    _meta: object;
}>;
