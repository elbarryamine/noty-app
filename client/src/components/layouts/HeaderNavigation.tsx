import { Button } from '@chakra-ui/button';
import { Flex, Heading, HStack } from '@chakra-ui/layout';
import { useUserStore } from '@store/user';
import React from 'react';

const HeaderNavigation = () => {
  const removeUser = useUserStore((state) => state.removeUser);
  return (
    <Flex
      as="nav"
      h="full"
      justify="space-between"
      align="center"
      px="40px"
      py="20px"
    >
      <Heading>Notes</Heading>
      <HStack>
        <Button variant="primary" onClick={removeUser}>
          Logout
        </Button>
      </HStack>
    </Flex>
  );
};

export default HeaderNavigation;
