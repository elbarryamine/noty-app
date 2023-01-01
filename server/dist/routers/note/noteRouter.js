"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRouter = void 0;
const trpc_1 = require("../../config/trpc");
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const userMiddleware_1 = require("../../middlewares/userMiddleware");
const server_1 = require("@trpc/server");
const prisma = new client_1.PrismaClient();
const noteInput = zod_1.default
    .object({
    text: zod_1.default.string(),
    title: zod_1.default.string(),
    color: zod_1.default.string().optional(),
    categoryId: zod_1.default.number(),
})
    .superRefine(({ text, title }, ctx) => {
    if (!text && !title) {
        ctx.addIssue({
            code: 'custom',
            message: 'Please please provide either the title or the content',
            path: ['title'],
        });
        ctx.addIssue({
            code: 'custom',
            message: 'Please please provide either the title or the content',
            path: ['text'],
        });
    }
});
const noteDeleteInput = zod_1.default.object({
    id: zod_1.default.number(),
    isRestore: zod_1.default.boolean().default(false),
});
const noteArchiveInput = zod_1.default.object({
    id: zod_1.default.number(),
    isArchived: zod_1.default.boolean(),
});
const withUserProcedure = trpc_1.default.procedure.use(userMiddleware_1.isUser);
exports.noteRouter = trpc_1.default.router({
    get: withUserProcedure.query(async ({ ctx }) => {
        try {
            const notes = await prisma.noty.findMany({
                where: { AND: { userId: ctx.user.id, isTrashed: false } },
            });
            return notes;
        }
        catch (e) {
            throw new server_1.TRPCError({
                code: e instanceof server_1.TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
                message: e instanceof server_1.TRPCError ? e.message : 'could not get user notes',
                cause: e,
            });
        }
    }),
    getTrash: withUserProcedure.query(async ({ ctx }) => {
        try {
            const notes = await prisma.noty.findMany({
                where: { AND: { userId: ctx.user.id, isTrashed: true } },
            });
            return notes;
        }
        catch (e) {
            throw new server_1.TRPCError({
                code: e instanceof server_1.TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
                message: e instanceof server_1.TRPCError
                    ? e.message
                    : 'could not get user deleted notes',
                cause: e,
            });
        }
    }),
    getFavorite: withUserProcedure.query(async ({ ctx }) => {
        try {
            const notes = await prisma.noty.findMany({
                where: {
                    AND: { userId: ctx.user.id, isArchived: true, isTrashed: false },
                },
            });
            return notes;
        }
        catch (e) {
            throw new server_1.TRPCError({
                code: e instanceof server_1.TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
                message: e instanceof server_1.TRPCError
                    ? e.message
                    : 'could not get user deleted notes',
                cause: e,
            });
        }
    }),
    create: withUserProcedure
        .input(noteInput)
        .mutation(async ({ ctx, input }) => {
        try {
            const note = await prisma.noty.create({
                data: {
                    text: input.text,
                    title: input.title,
                    color: input.color,
                    userId: ctx.user.id,
                    categoryId: input.categoryId,
                },
            });
            return note;
        }
        catch (e) {
            throw new server_1.TRPCError({
                code: e instanceof server_1.TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
                message: e instanceof server_1.TRPCError ? e.message : 'could not create notes',
                cause: e,
            });
        }
    }),
    delete: withUserProcedure
        .input(noteDeleteInput)
        .mutation(async ({ ctx, input }) => {
        try {
            const note = await prisma.noty.findFirst({ where: { id: input.id } });
            if (!note) {
                throw new server_1.TRPCError({
                    code: 'NOT_FOUND',
                    message: 'could not find note',
                });
            }
            if (note.userId === ctx.user.id) {
                await prisma.noty.delete({ where: { id: note.id } });
                return { note };
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
                message: e instanceof server_1.TRPCError ? e.message : 'could not delete note',
                cause: e,
            });
        }
    }),
    archive: withUserProcedure
        .input(noteArchiveInput)
        .mutation(async ({ ctx, input }) => {
        try {
            const note = await prisma.noty.findFirst({ where: { id: input.id } });
            if (!note) {
                throw new server_1.TRPCError({
                    code: 'NOT_FOUND',
                    message: 'could not find note',
                });
            }
            if (note.userId === ctx.user.id) {
                const updatedNote = await prisma.noty.update({
                    where: { id: note.id },
                    data: { isArchived: input.isArchived },
                    include: { category: true },
                });
                return {
                    note: updatedNote,
                };
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
                message: e instanceof server_1.TRPCError ? e.message : 'could not archive note',
                cause: e,
            });
        }
    }),
    trash: withUserProcedure
        .input(noteDeleteInput)
        .mutation(async ({ ctx, input }) => {
        try {
            const note = await prisma.noty.findFirst({ where: { id: input.id } });
            if (!note) {
                throw new server_1.TRPCError({
                    code: 'NOT_FOUND',
                    message: 'could not find note',
                });
            }
            if (note.userId === ctx.user.id) {
                await prisma.noty.update({
                    where: { id: note.id },
                    data: { isTrashed: !input.isRestore },
                });
                return { note };
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
                message: e instanceof server_1.TRPCError ? e.message : 'could not delete note',
                cause: e,
            });
        }
    }),
});
//# sourceMappingURL=noteRouter.js.map