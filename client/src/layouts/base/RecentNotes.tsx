import React from 'react';
import { Stack, Text } from '@chakra-ui/react';
import { trpc } from '@shared/utils/trpc/trpc';
import NoteCard from '@components/layouts/NoteCard';
import NotesContainer from '@components/containers/NotesContainer';

const RecentNotes = () => {
  const notes = trpc.note.get.useQuery({ limit: 10 });
  return (
    <Stack spacing={5}>
      <Text variant="subheader">Recent notes</Text>
      <NotesContainer>
        {notes?.data?.length === 0 && (
          <Text>You dont have any recent notes</Text>
        )}
        {notes?.data?.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </NotesContainer>
    </Stack>
  );
};

export default RecentNotes;
