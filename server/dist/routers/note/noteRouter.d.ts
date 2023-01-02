export declare const noteRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        user: {
            id: string;
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
            limit?: number;
        };
        _input_out: {
            limit?: number;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import(".prisma/client").Noty[]>;
    getTrash: import("@trpc/server").BuildProcedure<"query", {
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
    }, import(".prisma/client").Noty[]>;
    getFavorite: import("@trpc/server").BuildProcedure<"query", {
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
    }, import(".prisma/client").Noty[]>;
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
            text?: string;
            title?: string;
            color?: string;
            categoryId?: string;
        };
        _input_out: {
            text?: string;
            title?: string;
            color?: string;
            categoryId?: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import(".prisma/client").Noty>;
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
            isRestore?: boolean;
        };
        _input_out: {
            id?: string;
            isRestore?: boolean;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        note: import(".prisma/client").Noty;
    }>;
    archive: import("@trpc/server").BuildProcedure<"mutation", {
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
            isArchived?: boolean;
        };
        _input_out: {
            id?: string;
            isArchived?: boolean;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        note: import(".prisma/client").Noty & {
            category: import(".prisma/client").Category;
        };
    }>;
    trash: import("@trpc/server").BuildProcedure<"mutation", {
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
            isRestore?: boolean;
        };
        _input_out: {
            id?: string;
            isRestore?: boolean;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        note: import(".prisma/client").Noty;
    }>;
}>;
