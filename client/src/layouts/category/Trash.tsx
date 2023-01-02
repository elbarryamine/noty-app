import React from 'react';
import { Text, Stack } from '@chakra-ui/react';
import Preloader from '@components/layouts/Preloader';
import { trpc } from '@shared/utils/trpc/trpc';
import NoteCard from '@components/layouts/NoteCard';
import NotesContainer from '@components/containers/NotesContainer';

function Trash() {
  const trash = trpc.note.getTrash.useQuery();

  if (trash.isLoading) return <Preloader />;
  return (
    <Stack
      spacing={10}
      px="40px"
      py="20px"
      pb="50px"
      overflowY="scroll"
      h="100%"
    >
      <Stack spacing={5}>
        <Text variant="subheader">Trash</Text>
        <NotesContainer>
          {trash.data?.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </NotesContainer>
      </Stack>
    </Stack>
  );
}

export default Trash;