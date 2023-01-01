import { Button } from '@chakra-ui/button';
import { Flex, Heading, HStack } from '@chakra-ui/layout';
// import ColorModeButton from '@components/elements/ColorModeButton';
import { useUserStore } from '@store/user';
import React from 'react';

const HeaderNavigation = () => {
  const removeUser = useUserStore((state) => state.removeUser);
  return (
    <nav>
      <Flex justify="space-between" align="center" py="20px">
        <Heading>Noty</Heading>
        <HStack>
          {/* <ColorModeButton /> */}
          <Button variant="primary" onClick={removeUser}>
            Logout
          </Button>
        </HStack>
      </Flex>
    </nav>
  );
};

export default HeaderNavigation;
