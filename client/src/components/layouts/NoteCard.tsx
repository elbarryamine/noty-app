import React from 'react';
import { NoteGetResponse } from '@shared/utils/trpc/types';
// import NoteDelete from './NoteDelete';
import * as hexContrastColor from 'hex-contrast-color';
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/layout';
import NoteArchive from './NoteArchive';
import { Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icon';
import { BsThreeDots } from 'react-icons/bs';
import NoteDelete from './NoteDelete';
import moment from 'moment';

export default function NoteCard({ note }: { note: NoteGetResponse[number] }) {
  const invertedColor = hexContrastColor(note.color);
  let whenAdded = moment(note.createdAt).local().fromNow();
  whenAdded = whenAdded[0].toUpperCase() + whenAdded.slice(1);
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
          <Text variant="sub">{whenAdded}</Text>
          <HStack spacing={2}>
            <NoteArchive note={note} />
            <Menu>
              <MenuButton>
                <Icon as={BsThreeDots} />
              </MenuButton>
              <MenuList>
                <NoteDelete note={note} />
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
