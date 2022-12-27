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
    categorie: zod_1.default.string(),
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
});
const withUserProcedure = trpc_1.default.procedure.use(userMiddleware_1.isUser);
exports.noteRouter = trpc_1.default.router({
    get: withUserProcedure.query(async ({ ctx }) => {
        try {
            const notes = await prisma.note.findMany({ where: { AND: { userId: ctx.user.id, isTrashed: false } } });
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
    create: withUserProcedure.input(noteInput).mutation(async ({ ctx, input }) => {
        try {
            const notes = await prisma.note.create({
                data: {
                    text: input.text,
                    title: input.title,
                    color: input.color,
                    categorie: input.categorie,
                    userId: ctx.user.id,
                },
            });
            return notes;
        }
        catch (e) {
            throw new server_1.TRPCError({
                code: e instanceof server_1.TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
                message: e instanceof server_1.TRPCError ? e.message : 'could not create notes',
                cause: e,
            });
        }
    }),
    delete: withUserProcedure.input(noteDeleteInput).mutation(async ({ ctx, input }) => {
        try {
            const note = await prisma.note.findFirst({ where: { id: input.id } });
            if (!note) {
                throw new server_1.TRPCError({
                    code: 'NOT_FOUND',
                    message: 'could not find note',
                });
            }
            if (note.userId === ctx.user.id) {
                await prisma.note.delete({ where: { id: note.id } });
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