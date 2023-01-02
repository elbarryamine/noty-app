import React from 'react';
import { trpc } from '@shared/utils/trpc/trpc';
import NoteCard from '../NoteCard/NoteCard';
import { Grid, Stack, Text } from '@chakra-ui/react';

const CategoryNotesList = ({ categoryId }: { categoryId: number }) => {
  const category = trpc.category.getById.useQuery({ id: categoryId });
  const data = category.data?.notes ?? [];
  return (
    <Stack spacing={2}>
      {data.length === 0 && (
        <Text>You dont have any items on this category</Text>
      )}
      <Grid gridTemplateColumns="1fr 1fr 1fr" gridGap="10px">
        {data.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </Grid>
    </Stack>
  );
};
export default CategoryNotesList;
