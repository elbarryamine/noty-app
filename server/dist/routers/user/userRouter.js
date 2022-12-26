"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const trpc_1 = require("../../config/trpc");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const server_1 = require("@trpc/server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new client_1.PrismaClient();
const signupInput = zod_1.default.object({
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
const loginInput = zod_1.default.object({
    email: zod_1.default.string().email('Please provide a valid email'),
    password: zod_1.default.string(),
});
exports.userRouter = trpc_1.default.router({
    login: trpc_1.default.procedure.input(loginInput).mutation(async ({ input }) => {
        try {
            const user = await prisma.user.findFirst({ where: { email: input.email } });
            if (!user)
                throw new server_1.TRPCError({ message: 'email or password is incorrect', code: 'INTERNAL_SERVER_ERROR' });
            const matchPass = await bcrypt.compare(input.password, user.password);
            if (!matchPass)
                throw new server_1.TRPCError({ message: 'email or password is incorrect', code: 'INTERNAL_SERVER_ERROR' });
            const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            return { token: accessToken };
        }
        catch (error) {
            throw new server_1.TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'could not save the user',
                cause: error,
            });
        }
    }),
    sigunp: trpc_1.default.procedure.input(signupInput).mutation(async ({ input }) => {
        try {
            const user = await prisma.user.findFirst({ where: { email: input.email } });
            if (user)
                throw new server_1.TRPCError({ message: 'user with this email already exist', code: 'INTERNAL_SERVER_ERROR' });
            const hashedPassword = await bcrypt.hash(input.password, 10);
            await prisma.user.create({
                data: {
                    email: input.email,
                    firstName: input.firstName,
                    lastName: input.lastName,
                    password: hashedPassword,
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