import trpc from '../../config/trpc';
import { PrismaClient } from '@prisma/client';
import z from 'zod';
import { isUser } from '../../middlewares/userMiddleware';
import { TRPCError } from '@trpc/server';

const prisma = new PrismaClient();

const noteInput = z.object({
  name: z.string(),
});

const withUserProcedure = trpc.procedure.use(isUser);
export const noteRouter = trpc.router({
  get: withUserProcedure.query(async ({ ctx }) => {
    try {
      const notes = await prisma.note.findMany({ where: { userId: ctx.user.id } });
      return notes;
    } catch (error) {
      throw new TRPCError({
        code: error.code ?? 'INTERNAL_SERVER_ERROR',
        message: error.message ?? 'could not get user notes',
      });
    }
  }),
  create: withUserProcedure.input(noteInput).mutation(async ({ ctx }) => {
    try {
      const notes = await prisma.note.create({
        data: {
          text: 'hi',
          title: 'title',
          userId: ctx.user.id,
        },
      });
      return notes;
    } catch (error) {
      throw new TRPCError({
        code: error.code ?? 'INTERNAL_SERVER_ERROR',
        message: error.message ?? 'could not get create notes',
      });
    }
  }),
});
