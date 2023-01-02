import trpc from '../../config/trpc';
import z from 'zod';
import { PrismaClient } from '@prisma/client';
import { isUser } from '../../middlewares/userMiddleware';
import { TRPCError } from '@trpc/server';

const prisma = new PrismaClient();

const categoryInput = z.object({
  id: z.number(),
  name: z.string(),
  userId: z.number(),
  createdAt: z.date(),
});

const categoryFind = z.object({
  id: z.number(),
});

const categoryDeleteInput = z.object({
  id: z.number(),
});

const withUserProcedure = trpc.procedure.use(isUser);
export const categoryRouter = trpc.router({
  getById: withUserProcedure
    .input(categoryFind)
    .query(async ({ ctx, input }) => {
      try {
        return await prisma.category.findFirst({
          where: {
            AND: {
              id: input.id,
              userId: ctx.user.id,
              notes: {
                every: {
                  isTrashed: false,
                },
              },
            },
          },
          include: {
            notes: true,
          },
        });
      } catch (e: unknown) {
        throw new TRPCError({
          code: e instanceof TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
          message:
            e instanceof TRPCError ? e.message : 'could not get categorie',
          cause: e,
        });
      }
    }),
  get: withUserProcedure.query(async ({ ctx }) => {
    try {
      const categories = await prisma.category.findMany({
        where: {
          AND: { userId: ctx.user.id },
        },
        include: {
          notes: true,
        },
      });
      return categories;
    } catch (e: unknown) {
      throw new TRPCError({
        code: e instanceof TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
        message:
          e instanceof TRPCError ? e.message : 'could not get categories',
        cause: e,
      });
    }
  }),

  create: withUserProcedure
    .input(categoryInput)
    .mutation(async ({ ctx, input }) => {
      try {
        const categories = await prisma.category.create({
          data: {
            name: input.name,
            userId: ctx.user.id,
          },
          include: {
            notes: true,
          },
        });
        return categories;
      } catch (e: unknown) {
        throw new TRPCError({
          code: e instanceof TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
          message:
            e instanceof TRPCError ? e.message : 'could not create category',
          cause: e,
        });
      }
    }),
  delete: withUserProcedure
    .input(categoryDeleteInput)
    .mutation(async ({ ctx, input }) => {
      try {
        const category = await prisma.category.findFirst({
          where: { id: input.id },
        });
        if (!category) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'could not find category',
          });
        }
        if (category.userId === ctx.user.id) {
          await prisma.category.delete({ where: { id: category.id } });
          return { category };
        } else {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'you are not authorized',
          });
        }
      } catch (e: unknown) {
        throw new TRPCError({
          code: e instanceof TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
          message:
            e instanceof TRPCError ? e.message : 'could not delete category',
          cause: e,
        });
      }
    }),
});
