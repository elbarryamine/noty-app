import React from 'react';
import { Text, Stack } from '@chakra-ui/react';
import Preloader from '@components/layouts/Preloader';
import { trpc } from '@shared/utils/trpc/trpc';
import NoteCard from '@components/layouts/NoteCard';
import NotesContainer from '@components/containers/NotesContainer';
import BaseContainer from '@components/containers/BaseContainer';
import NoMatchesFound from '@components/elements/NoMatchesFound';

function Favorite() {
  const favorite = trpc.note.getFavorite.useQuery();

  if (favorite.isLoading) return <Preloader />;
  return (
    <BaseContainer>
      <Stack spacing={5}>
        <Text variant="subheader">Favorite</Text>
        {favorite.data?.length === 0 && <NoMatchesFound />}
        <NotesContainer>
          {favorite.data?.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </NotesContainer>
      </Stack>
    </BaseContainer>
  );
}

export default Favorite;
