import trpc from '../../config/trpc';
import { PrismaClient } from '@prisma/client';
import z from 'zod';
import { TRPCError } from '@trpc/server';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const signupSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please provide a valid email'),
  firstName: z
    .string()
    .min(3, 'First name must be at least 3 character')
    .max(18, 'First name must be at most 18 character'),
  lastName: z
    .string()
    .min(3, 'Last name must be at least 3 character')
    .max(18, 'Last name must be at most 18 character'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'email is required')
    .email('Please provide a valid email'),
  password: z.string().min(1, 'password is required'),
});

export const userRouter = trpc.router({
  login: trpc.procedure
    .input(loginSchema)
    .mutation(async ({ input }): Promise<{ token: string }> => {
      try {
        // find user by email
        const user = await prisma.user.findUnique({
          where: { email: input.email },
        });
        if (!user) {
          throw new TRPCError({
            message: 'email or password is incorrect',
            code: 'INTERNAL_SERVER_ERROR',
          });
        }
        // check pass match
        const matchPass = await bcrypt.compare(input.password, user.password);
        if (!matchPass)
          throw new TRPCError({
            message: 'email or password is incorrect',
            code: 'INTERNAL_SERVER_ERROR',
          });

        // return token we should refresh token later
        const accessToken = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET as jwt.Secret,
        );
        return { token: accessToken };
      } catch (e: unknown) {
        throw new TRPCError({
          code: e instanceof TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
          message: e instanceof TRPCError ? e.message : 'could not find user',
          cause: e,
        });
      }
    }),
  sigunp: trpc.procedure.input(signupSchema).mutation(async ({ input }) => {
    try {
      const user = await prisma.user.findFirst({
        where: { email: input.email },
      });
      if (user)
        throw new TRPCError({
          message: 'user with this email already exist',
          code: 'INTERNAL_SERVER_ERROR',
        });
      const hashedPassword = await bcrypt.hash(input.password, 10);

      const savedUser = await prisma.user.create({
        data: {
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          password: hashedPassword,
        },
      });
      const notesCategorie = await prisma.folder.create({
        data: {
          userId: savedUser.id,
          name: 'Getting Started',
          icon: 'FiFolder',
        },
      });

      await prisma.note.create({
        data: {
          userId: savedUser.id,
          folderId: notesCategorie.id,
          title: 'My first note',
          text: 'Hello world',
        },
      });
    } catch (e: unknown) {
      throw new TRPCError({
        code: e instanceof TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
        message: e instanceof TRPCError ? e.message : 'could not save user',
        cause: e,
      });
    }
  }),
});
