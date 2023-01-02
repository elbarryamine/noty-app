import React from 'react';
import { Stack } from '@chakra-ui/react';
import PinnedNotes from './PinnedNotes';
import RecentNotes from './RecentNotes';
export default function Base() {
  return (
    <Stack
      spacing={20}
      px="40px"
      py="20px"
      pb="50px"
      overflowY="scroll"
      h="100%"
    >
      <PinnedNotes />
      <RecentNotes />
    </Stack>
  );
}
