import React from 'react';
import { Button } from '@chakra-ui/button';
import { trpc } from '@shared/utils/trpc/trpc';
import NoteCard from './NoteCard/NoteCard';
import { Stack, Text } from '@chakra-ui/react';

export const TrashNotesList = () => {
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

export const FavoriteNotesList = () => {
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

export const CategoryNotesList = ({ categoryId }: { categoryId: number }) => {
  const category = trpc.category.getById.useQuery({ id: categoryId });
  const data = category.data?.notes ?? [];
  return (
    <Stack spacing={2}>
      {data.length === 0 && (
        <Text>You dont have any items on this category</Text>
      )}
      {data.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </Stack>
  );
};
