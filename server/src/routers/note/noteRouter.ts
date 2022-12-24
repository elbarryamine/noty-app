import { procedure, router } from '../../config/trpc';
import { Note, PrismaClient } from '@prisma/client';
import z from 'zod';

const prisma = new PrismaClient();

const noteInput = z.object({
  name: z.string(),
});

export const noteRouter = router({
  get: procedure.query(async () => {
    const notes = await prisma.note.findMany();
    return notes;
  }),
  create: procedure.input(noteInput).mutation(async ({ input }) => {
    console.log('this create a note', input);
  }),
});
