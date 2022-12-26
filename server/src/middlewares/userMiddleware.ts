import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import trpc from '../config/trpc';

const prisma = new PrismaClient();
export const isUser = trpc.middleware(async ({ ctx, next }) => {
  if (!ctx.user?.id) {
    throw new TRPCError({ message: 'you dont have access', code: 'UNAUTHORIZED' });
  }
  const user = await prisma.user.findFirst({ where: { id: ctx.user.id } });
  if (!user) {
    throw new TRPCError({ message: 'you dont have access', code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { ...ctx, user: user } });
});
