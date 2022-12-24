"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const trpc_1 = require("../../config/trpc");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const server_1 = require("@trpc/server");
const prisma = new client_1.PrismaClient();
const userInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    firstName: zod_1.default.string().min(1).max(18),
    lastName: zod_1.default.string().min(1).max(18),
    password: zod_1.default.string(),
    passwordConfirm: zod_1.default.string(),
});
exports.userRouter = (0, trpc_1.router)({
    get: trpc_1.procedure.query(async () => {
        const users = await prisma.user.findMany();
        return users;
    }),
    create: trpc_1.procedure.input(userInput).mutation(async ({ input }) => {
        try {
            await prisma.user.create({
                data: {
                    email: input.email,
                    firstName: input.firstName,
                    lastName: input.lastName,
                    password: input.password,
                },
            });
        }
        catch (error) {
            throw new server_1.TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'could not save the user',
                cause: error,
            });
        }
    }),
});
//# sourceMappingURL=userRouter.js.map