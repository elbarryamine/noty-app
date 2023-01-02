import React from 'react';
import { Stack, Text } from '@chakra-ui/react';
import { trpc } from '@shared/utils/trpc/trpc';
import NoteCard from '@components/layouts/NoteCard';
import NotesContainer from '@components/containers/NotesContainer';

const PinnedNotes = () => {
  const notes = trpc.note.getFavorite.useQuery();
  return (
    <Stack spacing={5}>
      <Text variant="subheader">Pinned notes</Text>
      <NotesContainer>
        {notes.data?.length === 0 && <Text>You dont have pinned notes</Text>}
        {notes.data?.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </NotesContainer>
    </Stack>
  );
};

export default PinnedNotes;
