import trpc from '../../config/trpc';
import z from 'zod';
import { PrismaClient } from '@prisma/client';
import { isUser } from '../../middlewares/userMiddleware';
import { TRPCError } from '@trpc/server';

const prisma = new PrismaClient();

const folderCreateSchema = z.object({
  name: z
    .string()
    .min(1, 'Folder name must be more than 3 letters')
    .max(255, 'Folder name must be less than 255 letters'),
  icon: z.string().optional(),
});

const folderFindSchema = z.object({
  id: z.string().min(1, 'id is required'),
});

const folderDeleteSchema = z.object({
  id: z.string().min(1, 'id is required'),
});

const withUserProcedure = trpc.procedure.use(isUser);
export const folderRouter = trpc.router({
  getById: withUserProcedure
    .input(folderFindSchema)
    .query(async ({ ctx, input }) => {
      try {
        const folder = await prisma.folder.findFirst({
          where: {
            AND: {
              id: input.id,
              userId: ctx.user.id,
            },
          },
          include: {
            notes: {
              where: {
                isTrashed: false,
              },
            },
          },
        });
        return folder;
      } catch (e: unknown) {
        throw new TRPCError({
          code: e instanceof TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
          message: e instanceof TRPCError ? e.message : 'could not get folder',
          cause: e,
        });
      }
    }),
  get: withUserProcedure.query(async ({ ctx }) => {
    try {
      const folders = await prisma.folder.findMany({
        where: {
          AND: { userId: ctx.user.id },
        },
        include: {
          notes: true,
        },
      });
      return folders;
    } catch (e: unknown) {
      throw new TRPCError({
        code: e instanceof TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
        message: e instanceof TRPCError ? e.message : 'could not get folders',
        cause: e,
      });
    }
  }),

  create: withUserProcedure
    .input(folderCreateSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const folders = await prisma.folder.create({
          data: {
            name: input.name,
            icon: input.icon,
            userId: ctx.user.id,
          },
          include: {
            notes: true,
          },
        });
        return folders;
      } catch (e: unknown) {
        throw new TRPCError({
          code: e instanceof TRPCError ? e.code : 'INTERNAL_SERVER_ERROR',
          message:
            e instanceof TRPCError ? e.message : 'could not create folder',
          cause: e,
        });
      }
    }),
  delete: withUserProcedure
    .input(folderDeleteSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const folder = await prisma.folder.findFirst({
          where: { id: input.id },
        });
        if (!folder) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'could not find folder',
          });
        }
        if (folder.userId === ctx.user.id) {
          await prisma.folder.delete({ where: { id: folder.id } });
          return { folder };
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
            e instanceof TRPCError ? e.message : 'could not delete folder',
          cause: e,
        });
      }
    }),
});
