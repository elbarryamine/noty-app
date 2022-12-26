import trpc from '../../config/trpc';
import { PrismaClient } from '@prisma/client';
import z from 'zod';
import { TRPCError } from '@trpc/server';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const signupInput = z.object({
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

const loginInput = z.object({
  email: z.string().email('Please provide a valid email'),
  password: z.string(),
});

export const userRouter = trpc.router({
  login: trpc.procedure.input(loginInput).mutation(async ({ input }): Promise<{ token: string }> => {
    try {
      // find user by email
      const user = await prisma.user.findFirst({ where: { email: input.email } });
      if (!user) throw new TRPCError({ message: 'email or password is incorrect', code: 'INTERNAL_SERVER_ERROR' });
      // check pass match
      const matchPass = await bcrypt.compare(input.password, user.password);
      if (!matchPass) throw new TRPCError({ message: 'email or password is incorrect', code: 'INTERNAL_SERVER_ERROR' });

      // return token we should refresh token later
      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as jwt.Secret);
      return { token: accessToken };
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'could not save the user',
        cause: error,
      });
    }
  }),
  sigunp: trpc.procedure.input(signupInput).mutation(async ({ input }) => {
    try {
      const user = await prisma.user.findFirst({ where: { email: input.email } });
      if (user) throw new TRPCError({ message: 'user with this email already exist', code: 'INTERNAL_SERVER_ERROR' });
      const hashedPassword = await bcrypt.hash(input.password, 10);
      await prisma.user.create({
        data: {
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          password: hashedPassword,
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
