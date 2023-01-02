"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderRouter = void 0;
const trpc_1 = require("../../config/trpc");
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const userMiddleware_1 = require("../../middlewares/userMiddleware");
const server_1 = require("@trpc/server");
const prisma = new client_1.PrismaClient();
const folderCreateInput = zod_1.default.object({
    name: zod_1.default.string(),
    icon: zod_1.default.string().optional(),
});
const folderFindInput = zod_1.default.object({
    id: zod_1.default.string(),
});
const folderDeleteInput = zod_1.default.object({
    id: zod_1.default.string(),
});
const withUserProcedure = trpc_1.default.procedure.use(userMiddleware_1.isUser);
exports.folderRouter = trpc_1.default.router({
    getById: withUserProcedure
        .input(folderFindInput)
        .query(async ({ ctx, input }) => {
        try {
            return await prisma.folder.findFirst({
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
                message: e instanceof server_1.TRPCError ? e.message : 'could not get folder',
                cause: e,
            });
        }
    }),
    get: withUserProcedure.query(async ({ ctx }) => {
        try {
            const folders = await prisma.folder.findMany({
                where: {
                    AND: { userId: ctx.user.id },
                },
                include: {
                    notes: true,
                },
            });
            return folders;
        }
        catch (e) {
            throw new server_1.TRPCError({
                code: e instanceof server_1.TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
                message: e instanceof server_1.TRPCError ? e.message : 'could not get folders',
                cause: e,
            });
        }
    }),
    create: withUserProcedure
        .input(folderCreateInput)
        .mutation(async ({ ctx, input }) => {
        try {
            const folders = await prisma.folder.create({
                data: {
                    name: input.name,
                    icon: input.icon,
                    userId: ctx.user.id,
                },
                include: {
                    notes: true,
                },
            });
            return folders;
        }
        catch (e) {
            throw new server_1.TRPCError({
                code: e instanceof server_1.TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
                message: e instanceof server_1.TRPCError ? e.message : 'could not create folder',
                cause: e,
            });
        }
    }),
    delete: withUserProcedure
        .input(folderDeleteInput)
        .mutation(async ({ ctx, input }) => {
        try {
            const folder = await prisma.folder.findFirst({
                where: { id: input.id },
            });
            if (!folder) {
                throw new server_1.TRPCError({
                    code: 'NOT_FOUND',
                    message: 'could not find folder',
                });
            }
            if (folder.userId === ctx.user.id) {
                await prisma.folder.delete({ where: { id: folder.id } });
                return { folder };
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
                message: e instanceof server_1.TRPCError ? e.message : 'could not delete folder',
                cause: e,
            });
        }
    }),
});
//# sourceMappingURL=folderRouter.js.map