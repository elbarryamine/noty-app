"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const trpc_1 = require("../../config/trpc");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const server_1 = require("@trpc/server");
const prisma = new client_1.PrismaClient();
const userInput = zod_1.default.object({
    email: zod_1.default.string().email('Please provide a valid email'),
    firstName: zod_1.default
        .string()
        .min(2, 'First name must be at least 2 character')
        .max(18, 'First name must be at most 18 character'),
    lastName: zod_1.default
        .string()
        .min(2, 'Last name must be at least 2 character')
        .max(18, 'Last name must be at most 18 character'),
    password: zod_1.default.string(),
});
exports.userRouter = (0, trpc_1.router)({
    login: trpc_1.procedure.query(async () => {
        const users = await prisma.user.findMany();
        return users;
    }),
    sigunp: trpc_1.procedure.input(userInput).mutation(async ({ input }) => {
        var _a, _b;
        try {
            const user = await prisma.user.findFirst({ where: { email: input.email } });
            if (user)
                throw new server_1.TRPCError({ message: 'user with this email already exist', code: 'INTERNAL_SERVER_ERROR' });
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
                code: (_a = error.code) !== null && _a !== void 0 ? _a : 'INTERNAL_SERVER_ERROR',
                message: (_b = error.message) !== null && _b !== void 0 ? _b : 'could not save the user',
            });
        }
    }),
});
//# sourceMappingURL=userRouter.js.map