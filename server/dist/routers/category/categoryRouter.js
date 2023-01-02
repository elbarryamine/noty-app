"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const trpc_1 = require("../../config/trpc");
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const userMiddleware_1 = require("../../middlewares/userMiddleware");
const server_1 = require("@trpc/server");
const prisma = new client_1.PrismaClient();
const categoryInput = zod_1.default.object({
    id: zod_1.default.string(),
    name: zod_1.default.string(),
    userId: zod_1.default.number(),
    createdAt: zod_1.default.date(),
});
const categoryFind = zod_1.default.object({
    id: zod_1.default.string(),
});
const categoryDeleteInput = zod_1.default.object({
    id: zod_1.default.string(),
});
const withUserProcedure = trpc_1.default.procedure.use(userMiddleware_1.isUser);
exports.categoryRouter = trpc_1.default.router({
    getById: withUserProcedure
        .input(categoryFind)
        .query(async ({ ctx, input }) => {
        try {
            return await prisma.category.findFirst({
                where: {
                    AND: {
                        id: input.id,
                        userId: ctx.user.id,
                        notes: {
                            every: {
                                isTrashed: false,
                            },
                        },
                    },
                },
                include: {
                    notes: true,
                },
            });
        }
        catch (e) {
            throw new server_1.TRPCError({
                code: e instanceof server_1.TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
                message: e instanceof server_1.TRPCError ? e.message : 'could not get categorie',
                cause: e,
            });
        }
    }),
    get: withUserProcedure.query(async ({ ctx }) => {
        try {
            const categories = await prisma.category.findMany({
                where: {
                    AND: { userId: ctx.user.id },
                },
                include: {
                    notes: true,
                },
            });
            return categories;
        }
        catch (e) {
            throw new server_1.TRPCError({
                code: e instanceof server_1.TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
                message: e instanceof server_1.TRPCError ? e.message : 'could not get categories',
                cause: e,
            });
        }
    }),
    create: withUserProcedure
        .input(categoryInput)
        .mutation(async ({ ctx, input }) => {
        try {
            const categories = await prisma.category.create({
                data: {
                    name: input.name,
                    userId: ctx.user.id,
                },
                include: {
                    notes: true,
                },
            });
            return categories;
        }
        catch (e) {
            throw new server_1.TRPCError({
                code: e instanceof server_1.TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
                message: e instanceof server_1.TRPCError ? e.message : 'could not create category',
                cause: e,
            });
        }
    }),
    delete: withUserProcedure
        .input(categoryDeleteInput)
        .mutation(async ({ ctx, input }) => {
        try {
            const category = await prisma.category.findFirst({
                where: { id: input.id },
            });
            if (!category) {
                throw new server_1.TRPCError({
                    code: 'NOT_FOUND',
                    message: 'could not find category',
                });
            }
            if (category.userId === ctx.user.id) {
                await prisma.category.delete({ where: { id: category.id } });
                return { category };
            }
            else {
                throw new server_1.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'you are not authorized',
                });
            }
        }
        catch (e) {
            throw new server_1.TRPCError({
                code: e instanceof server_1.TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
                message: e instanceof server_1.TRPCError ? e.message : 'could not delete category',
                cause: e,
            });
        }
    }),
});
//# sourceMappingURL=categoryRouter.js.map