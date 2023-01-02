import React from 'react';
import { Text, Stack } from '@chakra-ui/react';
import Preloader from '@components/layouts/Preloader';
import { trpc } from '@shared/utils/trpc/trpc';
import { useRouter } from 'next/router';
import NoteCard from '@components/layouts/NoteCard';
import NotesContainer from '@components/containers/NotesContainer';

function Category() {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '';
  const category = trpc.category.getById.useQuery({ id });

  if (category.isLoading) return <Preloader />;
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
        <Text variant="subheader">{category.data?.name}</Text>
        <NotesContainer>
          {category.data?.notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </NotesContainer>
      </Stack>
    </Stack>
  );
}

export default Category;
