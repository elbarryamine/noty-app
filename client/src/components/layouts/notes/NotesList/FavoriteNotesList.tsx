import React from 'react';
import { trpc } from '@shared/utils/trpc/trpc';
import NoteCard from '../NoteCard/NoteCard';
import { Stack, Text } from '@chakra-ui/react';

const FavoriteNotesList = () => {
  const favouriteNotes = trpc.note.getFavorite.useQuery();
  const data = favouriteNotes.data ?? [];

  return (
    <Stack spacing={2}>
      {data.length === 0 ? (
        <Text>You dont have any favorite notes</Text>
      ) : (
        <>
          {data.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </>
      )}
    </Stack>
  );
};
export default FavoriteNotesList;
