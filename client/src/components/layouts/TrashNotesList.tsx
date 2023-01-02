import React from 'react';
import { Button } from '@chakra-ui/button';
import { trpc } from '@shared/utils/trpc/trpc';
import NoteCard from './NoteCard';
import { Stack, Text } from '@chakra-ui/react';

const TrashNotesList = () => {
  const trashedNotes = trpc.note.getTrash.useQuery();
  const data = trashedNotes.data ?? [];
  return (
    <Stack spacing={2}>
      {data.length === 0 && <Text>You dont have any deleted notes</Text>}
      {data.length > 0 ? (
        <Button colorScheme="red" alignSelf="flex-end">
          Clear Trash
        </Button>
      ) : null}
      {data.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </Stack>
  );
};
export default TrashNotesList;
