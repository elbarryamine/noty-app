import { procedure, router } from '../../config/trpc';
import { User, PrismaClient } from '@prisma/client';
import z from 'zod';
import { TRPCError } from '@trpc/server';

const prisma = new PrismaClient();

const userInput = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(18),
  lastName: z.string().min(1).max(18),
  password: z.string(),
  passwordConfirm: z.string(),
});

export const userRouter = router({
  get: procedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),
  create: procedure.input(userInput).mutation(async ({ input }) => {
    try {
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
        code: 'INTERNAL_SERVER_ERROR',
        message: 'could not save the user',
        cause: error,
      });
    }
  }),
});
