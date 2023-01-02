import React, { useEffect, useState } from 'react';
import AddNewNoteForm from './AddNewNoteForm';
import { FiFile } from 'react-icons/fi';
import { Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';
import { Button } from '@chakra-ui/button';
import { Text, HStack, Box } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/icon';

const NewNote = ({
  folderId,
  isTask,
}: {
  folderId: string;
  isTask?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    onClose();
  }, [folderId]);

  return (
    <Box position="relative">
      <Popover isOpen={isOpen}>
        <PopoverTrigger>
          <Button variant="primary" onClick={onOpen} zIndex={9999}>
            <HStack spacing={2} align="center" justify="center">
              <Text color="primaryText">
                Add new {isTask ? 'task' : 'note'}
              </Text>
              <Icon stroke="primaryText" size="25px" as={FiFile} />
            </HStack>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <AddNewNoteForm
            folderId={folderId}
            onClose={onClose}
            isTask={isTask}
          />
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default NewNote;
