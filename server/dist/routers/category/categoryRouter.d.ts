export declare const categoryRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        user: {
            id: string;
        };
    };
    meta: object;
    errorShape: never;
    transformer: import("@trpc/server").DataTransformerOptions;
}>, {
    getById: import("@trpc/server").BuildProcedure<"query", {
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
        _meta: object;
        _ctx_out: import("@trpc/server").Overwrite<{
            user: {
                id: string;
            };
        }, {
            user: import(".prisma/client").User;
        }>;
        _input_in: {
            id?: string;
        };
        _input_out: {
            id?: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import(".prisma/client").Category & {
        notes: import(".prisma/client").Noty[];
    }>;
    get: import("@trpc/server").BuildProcedure<"query", {
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
        _meta: object;
        _ctx_out: import("@trpc/server").Overwrite<{
            user: {
                id: string;
            };
        }, {
            user: import(".prisma/client").User;
        }>;
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, (import(".prisma/client").Category & {
        notes: import(".prisma/client").Noty[];
    })[]>;
    create: import("@trpc/server").BuildProcedure<"mutation", {
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
        _meta: object;
        _ctx_out: import("@trpc/server").Overwrite<{
            user: {
                id: string;
            };
        }, {
            user: import(".prisma/client").User;
        }>;
        _input_in: {
            id?: string;
            userId?: number;
            createdAt?: Date;
            name?: string;
        };
        _input_out: {
            id?: string;
            userId?: number;
            createdAt?: Date;
            name?: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import(".prisma/client").Category & {
        notes: import(".prisma/client").Noty[];
    }>;
    delete: import("@trpc/server").BuildProcedure<"mutation", {
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
        _meta: object;
        _ctx_out: import("@trpc/server").Overwrite<{
            user: {
                id: string;
            };
        }, {
            user: import(".prisma/client").User;
        }>;
        _input_in: {
            id?: string;
        };
        _input_out: {
            id?: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        category: import(".prisma/client").Category;
    }>;
}>;
