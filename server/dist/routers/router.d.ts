export declare const appRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        user: {
            id: number;
        };
    };
    meta: object;
    errorShape: never;
    transformer: import("@trpc/server").DataTransformerOptions;
}>, {
    note: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
                name?: string;
            };
            _input_out: {
                name?: string;
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
    user: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            user: {
                id: number;
            };
        };
        meta: object;
        errorShape: never;
        transformer: import("@trpc/server").DataTransformerOptions;
    }>, {
        login: import("@trpc/server").BuildProcedure<"mutation", {
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
            _ctx_out: {
                user: {
                    id: number;
                };
            };
            _input_in: {
                email?: string;
                password?: string;
            };
            _input_out: {
                email?: string;
                password?: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            token: string;
        }>;
        sigunp: import("@trpc/server").BuildProcedure<"mutation", {
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
            _ctx_out: {
                user: {
                    id: number;
                };
            };
            _input_in: {
                firstName?: string;
                lastName?: string;
                email?: string;
                password?: string;
            };
            _input_out: {
                firstName?: string;
                lastName?: string;
                email?: string;
                password?: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, void>;
    }>;
}>;
export type AppRouter = typeof appRouter;
