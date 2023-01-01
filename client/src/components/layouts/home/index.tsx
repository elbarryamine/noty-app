import React, { useState } from 'react';
import HeaderNavigation from '@components/layouts/HeaderNavigation';
import dynamic from 'next/dynamic';
import { Box, Container, Flex, HStack, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import { trpc } from '@shared/utils/trpc/trpc';
import NoteCard from '../notes/NoteCard';
import { AiOutlinePlus } from 'react-icons/ai';
import NoteCategorieSelect from '../notes/NoteCategorieSelect';

const NewNote = dynamic(() => import('../notes/NewNotePopup'));

const HomePage = () => {
  const categories = ['notes'];
  const [selected, setSelected] = useState(categories[0]);
  const notes = trpc.note.get.useQuery();
  const trashedNotes = trpc.note.getTrash.useQuery();
  return (
    <Box as='main' h='100vh'>
      <Container maxW='container.xl' px='10px' h='100%'>
        <Stack spacing={10} h='100%'>
          <HeaderNavigation />
          <Flex justify='space-between' align='center' flexDir='row'>
            <HStack>
              <NoteCategorieSelect
                categories={categories}
                selected={selected}
                onChange={(value) => setSelected(value)}
              />
              <Button
                px='30px'
                borderRadius='20px'
                borderWidth='2px'
                borderColor='blue'
                borderStyle='dashed'
                bg='transparent'
              >
                <HStack>
                  <Icon fill='blue' size='20px' as={AiOutlinePlus} />
                  <Text color='blue'>New Categorie</Text>
                </HStack>
              </Button>
            </HStack>
            <NewNote />
          </Flex>

          <Stack spacing={2}>
            {selected === 'trash' ? (
              <>
                {(trashedNotes.data ?? []).length > 0 && (
                  <Button colorScheme='red' alignSelf='flex-end'>
                    Clear Trash
                  </Button>
                )}
                {(trashedNotes.data ?? []).map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </>
            ) : (
              <>
                {(notes.data ?? []).map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
