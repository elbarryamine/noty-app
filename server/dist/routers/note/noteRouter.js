"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRouter = void 0;
const trpc_1 = require("../../config/trpc");
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const userMiddleware_1 = require("../../middlewares/userMiddleware");
const server_1 = require("@trpc/server");
const prisma = new client_1.PrismaClient();
const noteInput = zod_1.default.object({
    name: zod_1.default.string(),
});
const withUserProcedure = trpc_1.default.procedure.use(userMiddleware_1.isUser);
exports.noteRouter = trpc_1.default.router({
    get: withUserProcedure.query(async ({ ctx }) => {
        try {
            const notes = await prisma.note.findMany({ where: { userId: ctx.user.id } });
            return notes;
        }
        catch (error) {
            throw new server_1.TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'could not get user notes',
                cause: error,
            });
        }
    }),
    create: withUserProcedure.input(noteInput).mutation(async ({ ctx }) => {
        try {
            const notes = await prisma.note.create({
                data: {
                    text: 'hi',
                    title: 'title',
                    userId: ctx.user.id,
                },
            });
            return notes;
        }
        catch (error) {
            throw new server_1.TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'could not get create notes',
                cause: error,
            });
        }
    }),
});
//# sourceMappingURL=noteRouter.js.map