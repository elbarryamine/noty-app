import trpc from '../../config/trpc';
import z from 'zod';
import { PrismaClient } from '@prisma/client';
import { isUser } from '../../middlewares/userMiddleware';
import { TRPCError } from '@trpc/server';

const prisma = new PrismaClient();

const noteInput = z.object({
  name: z.string(),
});
const noteDeleteInput = z.object({
  id: z.number(),
});

const withUserProcedure = trpc.procedure.use(isUser);
export const noteRouter = trpc.router({
  get: withUserProcedure.query(async ({ ctx }) => {
    try {
      const notes = await prisma.note.findMany({ where: { AND: { userId: ctx.user.id, isTrashed: false } } });
      return notes;
    } catch (e: unknown) {
      throw new TRPCError({
        code: e instanceof TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
        message: e instanceof TRPCError ? e.message : 'could not get user notes',
        cause: e,
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
    } catch (e: unknown) {
      throw new TRPCError({
        code: e instanceof TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
        message: e instanceof TRPCError ? e.message : 'could not create notes',
        cause: e,
      });
    }
  }),
  delete: withUserProcedure.input(noteDeleteInput).mutation(async ({ ctx, input }) => {
    try {
      const note = await prisma.note.findFirst({ where: { id: input.id } });
      if (!note) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'could not find note',
        });
      }
      if (note.userId === ctx.user.id) {
        await prisma.note.delete({ where: { id: note.id } });
      } else {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'you are not authorized',
        });
      }
    } catch (e: unknown) {
      throw new TRPCError({
        code: e instanceof TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
        message: e instanceof TRPCError ? e.message : 'could not delete note',
        cause: e,
      });
    }
  }),
});
