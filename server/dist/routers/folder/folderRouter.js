"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderRouter = void 0;
const trpc_1 = require("../../config/trpc");
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const userMiddleware_1 = require("../../middlewares/userMiddleware");
const server_1 = require("@trpc/server");
const prisma = new client_1.PrismaClient();
const folderCreateSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(1, 'Folder name must be more than 3 letters')
        .max(255, 'Folder name must be less than 255 letters'),
    icon: zod_1.default.string().optional(),
});
const folderFindSchema = zod_1.default.object({
    id: zod_1.default.string().min(1, 'id is required'),
});
const folderDeleteSchema = zod_1.default.object({
    id: zod_1.default.string().min(1, 'id is required'),
});
const withUserProcedure = trpc_1.default.procedure.use(userMiddleware_1.isUser);
exports.folderRouter = trpc_1.default.router({
    getById: withUserProcedure
        .input(folderFindSchema)
        .query(async ({ ctx, input }) => {
        try {
            const folder = await prisma.folder.findFirst({
                where: {
                    AND: {
                        id: input.id,
                        userId: ctx.user.id,
                    },
                },
                include: {
                    notes: {
                        where: {
                            isTrashed: false,
                        },
                    },
                },
            });
            return folder;
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
        .input(folderCreateSchema)
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
        .input(folderDeleteSchema)
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