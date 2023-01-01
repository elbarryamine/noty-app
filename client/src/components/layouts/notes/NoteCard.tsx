import React from 'react';
import { NoteResponse } from '@shared/utils/trpc/types';
import NoteDelete from './NoteDelete';
import * as hexContrastColor from 'hex-contrast-color';
import { Box, Flex, Stack, Text } from '@chakra-ui/layout';

export default function NoteCard({ note }: { note: NoteResponse[number] }) {
  const invertedColor = hexContrastColor(note.color);
  return (
    <Box cursor='pointer' borderRadius='10px' p='20px' bg={note.color} shadow='sm'>
      <Stack>
        <Flex align='center' justify='space-between'>
          {note.title && (
            <Text variant='display' color={invertedColor}>
              {note.title}
            </Text>
          )}
          <NoteDelete note={note} />
        </Flex>
        <Text color={invertedColor}>{note.text}</Text>
      </Stack>
    </Box>
  );
}
