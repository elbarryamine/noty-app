export declare const isUser: import("@trpc/server").MiddlewareFunction<{
    _config: import("@trpc/server").RootConfig<{
        ctx: {
            user: {
                id: string;
            };
        };
        meta: object;
        errorShape: never;
        transformer: import("@trpc/server").DataTransformerOptions;
    }>;
    _ctx_out: {
        user: {
            id: string;
        };
    };
    _input_out: unknown;
    _input_in: unknown;
    _output_in: unknown;
    _output_out: unknown;
    _meta: object;
}, {
    _config: import("@trpc/server").RootConfig<{
        ctx: {
            user: {
                id: string;
            };
        };
        meta: object;
        errorShape: never;
        transformer: import("@trpc/server").DataTransformerOptions;
    }>;
    _ctx_out: {
        user: import(".prisma/client").User;
    };
    _input_in: unknown;
    _input_out: unknown;
    _output_in: unknown;
    _output_out: unknown;
    _meta: object;
}>;
