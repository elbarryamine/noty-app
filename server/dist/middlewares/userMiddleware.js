"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = void 0;
const client_1 = require("@prisma/client");
const server_1 = require("@trpc/server");
const trpc_1 = require("../config/trpc");
const prisma = new client_1.PrismaClient();
exports.isUser = trpc_1.default.middleware(async ({ ctx, next }) => {
    if (!ctx.id) {
        throw new server_1.TRPCError({ message: 'you dont have access', code: 'UNAUTHORIZED' });
    }
    const user = await prisma.user.findFirstOrThrow({ where: { id: ctx.id } });
    return next({ ctx: { id: ctx.id, user } });
});
//# sourceMappingURL=userMiddleware.js.map