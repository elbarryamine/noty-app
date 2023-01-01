import React from 'react';
import { NoteGetResponse } from '@shared/utils/trpc/types';
import NoteDelete from './NoteDelete';
import * as hexContrastColor from 'hex-contrast-color';
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/layout';
import NoteArchive from './NoteArchive';

export default function NoteCard({ note }: { note: NoteGetResponse[number] }) {
  const invertedColor = hexContrastColor(note.color);

  return (
    <Box
      cursor="pointer"
      borderRadius="10px"
      p="20px"
      bg={note.color}
      shadow="sm"
    >
      <Stack>
        <Flex align="center" justify="space-between">
          {note.title && (
            <Text variant="display" color={invertedColor}>
              {note.title}
            </Text>
          )}
          <HStack>
            <NoteDelete note={note} />
            <NoteArchive note={note} />
          </HStack>
        </Flex>
        <Text color={invertedColor}>{note.text}</Text>
      </Stack>
    </Box>
  );
}
