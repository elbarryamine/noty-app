"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = void 0;
const client_1 = require("@prisma/client");
const server_1 = require("@trpc/server");
const trpc_1 = require("../config/trpc");
const prisma = new client_1.PrismaClient();
exports.isUser = trpc_1.default.middleware(async ({ ctx, next }) => {
    var _a;
    if (!((_a = ctx.user) === null || _a === void 0 ? void 0 : _a.id)) {
        throw new server_1.TRPCError({ message: 'you dont have access', code: 'UNAUTHORIZED' });
    }
    const user = await prisma.user.findFirst({ where: { id: ctx.user.id } });
    if (!user) {
        throw new server_1.TRPCError({ message: 'you dont have access', code: 'UNAUTHORIZED' });
    }
    return next({ ctx: Object.assign(Object.assign({}, ctx), { user: user }) });
});
//# sourceMappingURL=userMiddleware.js.map