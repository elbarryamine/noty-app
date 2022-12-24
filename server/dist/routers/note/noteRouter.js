"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRouter = void 0;
const trpc_1 = require("../../config/trpc");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const noteInput = zod_1.default.object({
    name: zod_1.default.string(),
});
exports.noteRouter = (0, trpc_1.router)({
    get: trpc_1.procedure.query(async () => {
        const notes = await prisma.note.findMany();
        return notes;
    }),
    create: trpc_1.procedure.input(noteInput).mutation(async ({ input }) => {
        console.log('this create a note', input);
    }),
});
//# sourceMappingURL=noteRouter.js.map