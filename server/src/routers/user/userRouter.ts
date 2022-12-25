import { procedure, router } from '../../config/trpc';
import { PrismaClient } from '@prisma/client';
import z from 'zod';
import { TRPCError } from '@trpc/server';

const prisma = new PrismaClient();

const userInput = z.object({
  email: z.string().email('Please provide a valid email'),
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 character')
    .max(18, 'First name must be at most 18 character'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 character')
    .max(18, 'Last name must be at most 18 character'),
  password: z.string(),
});

export const userRouter = router({
  login: procedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),
  sigunp: procedure.input(userInput).mutation(async ({ input }) => {
    try {
      const user = await prisma.user.findFirst({ where: { email: input.email } });
      if (user) throw new TRPCError({ message: 'user with this email already exist', code: 'INTERNAL_SERVER_ERROR' });
      await prisma.user.create({
        data: {
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          password: input.password,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: error.code ?? 'INTERNAL_SERVER_ERROR',
        message: error.message ?? 'could not save the user',
      });
    }
  }),
});
