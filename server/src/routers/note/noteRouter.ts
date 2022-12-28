import trpc from '../../config/trpc';
import z from 'zod';
import { PrismaClient } from '@prisma/client';
import { isUser } from '../../middlewares/userMiddleware';
import { TRPCError } from '@trpc/server';

const prisma = new PrismaClient();

const noteInput = z
  .object({
    text: z.string(),
    title: z.string(),
    color: z.string().optional(),
    categorie: z.string(),
  })
  .superRefine(({ text, title }, ctx) => {
    if (!text && !title) {
      ctx.addIssue({
        code: 'custom',
        message: 'Please please provide either the title or the content',
        path: ['title'],
      });
      ctx.addIssue({
        code: 'custom',
        message: 'Please please provide either the title or the content',
        path: ['text'],
      });
    }
  });

const noteDeleteInput = z.object({
  id: z.number(),
  isRestore: z.boolean().default(false),
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
  getTrash: withUserProcedure.query(async ({ ctx }) => {
    try {
      const notes = await prisma.note.findMany({ where: { AND: { userId: ctx.user.id, isTrashed: true } } });
      return notes;
    } catch (e: unknown) {
      throw new TRPCError({
        code: e instanceof TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
        message: e instanceof TRPCError ? e.message : 'could not get user deleted notes',
        cause: e,
      });
    }
  }),
  create: withUserProcedure.input(noteInput).mutation(async ({ ctx, input }) => {
    try {
      const notes = await prisma.note.create({
        data: {
          text: input.text,
          title: input.title,
          color: input.color,
          categorie: input.categorie,
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
        return { note };
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
  trash: withUserProcedure.input(noteDeleteInput).mutation(async ({ ctx, input }) => {
    try {
      const note = await prisma.note.findFirst({ where: { id: input.id } });
      if (!note) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'could not find note',
        });
      }
      if (note.userId === ctx.user.id) {
        await prisma.note.update({ where: { id: note.id }, data: { isTrashed: !input.isRestore } });
        return { note };
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
