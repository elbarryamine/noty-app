import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import trpc from '../config/trpc';

const prisma = new PrismaClient();
export const isUser = trpc.middleware(async ({ ctx, next }) => {
  if (!ctx.id) {
    throw new TRPCError({ message: 'you dont have access', code: 'UNAUTHORIZED' });
  }
  const user = await prisma.user.findFirstOrThrow({ where: { id: ctx.id } });

  return next({ ctx: { id: ctx.id, user } });
});
