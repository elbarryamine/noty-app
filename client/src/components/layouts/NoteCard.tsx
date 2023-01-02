import React from 'react';
import { NoteGetResponse } from '@shared/utils/trpc/types';
// import NoteDelete from './NoteDelete';
import * as hexContrastColor from 'hex-contrast-color';
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/layout';
import NoteArchive from './NoteArchive';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icon';
import { BsThreeDots } from 'react-icons/bs';

export default function NoteCard({ note }: { note: NoteGetResponse[number] }) {
  const invertedColor = hexContrastColor(note.color);

  return (
    <Box
      cursor="pointer"
      borderRadius="10px"
      p="20px"
      bg={note.color}
      shadow="sm"
      borderWidth="1px"
      borderColor="whitesmoke"
    >
      <Stack>
        <Flex justify="space-between" align="center" w="full">
          <Text variant="sub">27th April, 2023</Text>
          <HStack spacing={2}>
            <NoteArchive note={note} />
            <Menu>
              <MenuButton>
                <Icon as={BsThreeDots} />
              </MenuButton>
              <MenuList>
                <MenuItem>Edit</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
        <Flex align="center" justify="space-between">
          {note.title && (
            <Text variant="display" color={invertedColor}>
              {note.title}
            </Text>
          )}
        </Flex>
        <Text color={invertedColor}>{note.text}</Text>
      </Stack>
    </Box>
  );
}
