import { Icon } from '@chakra-ui/icon';
import { Button } from '@chakra-ui/button';
import { Flex, Heading, HStack } from '@chakra-ui/layout';
import { useUserStore } from '@store/user';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useDisclosure } from '@chakra-ui/react';
import DrawerNavigation from './DrawerNavigation';

const HeaderNavigation = () => {
  const removeUser = useUserStore((state) => state.removeUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      as="nav"
      h="full"
      justify="space-between"
      align="center"
      px="40px"
      py="20px"
    >
      <HStack align="center">
        <Button variant="unstyled" onClick={onOpen}>
          <Icon as={AiOutlineMenu} height="30px" w="30px" />
        </Button>
        <Heading>Notes</Heading>
        <DrawerNavigation isOpen={isOpen} onClose={onClose} />
      </HStack>
      <HStack>
        <Button variant="primary" onClick={removeUser}>
          Logout
        </Button>
      </HStack>
    </Flex>
  );
};

export default HeaderNavigation;
