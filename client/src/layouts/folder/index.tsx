import React from 'react';
import { Text, Stack } from '@chakra-ui/react';
import Preloader from '@components/layouts/Preloader';
import { trpc } from '@shared/utils/trpc/trpc';
import { useRouter } from 'next/router';
import NoteCard from '@components/layouts/NoteCard';
import NotesContainer from '@components/containers/NotesContainer';
import BaseContainer from '@components/containers/BaseContainer';
import NoMatchesFound from '@components/elements/NoMatchesFound';

function Folder() {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : '';
  const folder = trpc.folder.getById.useQuery({ id });

  if (folder.isLoading) return <Preloader />;
  return (
    <BaseContainer>
      <Stack spacing={5}>
        <Text variant="subheader">{folder.data?.name}</Text>
        {folder.data?.notes.length === 0 && <NoMatchesFound />}
        <NotesContainer>
          {folder.data?.notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </NotesContainer>
      </Stack>
    </BaseContainer>
  );
}

export default Folder;
