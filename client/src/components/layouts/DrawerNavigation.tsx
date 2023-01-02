import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerProps,
  Flex,
  HStack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import SideNavigation from './SideNavigation';

function DrawerNavigation(props: Omit<DrawerProps, 'children'>) {
  return (
    <Drawer placement="left" {...props}>
      <DrawerContent p="0">
        <DrawerBody p="0">
          <DrawerCloseButton />
          <Flex
            p="20px"
            bg="bg"
            align="center"
            justify="center"
            borderWidth="1px"
            borderColor="whitesmoke"
          >
            <HStack>
              <Text variant="subheader">Noty Space</Text>
            </HStack>
          </Flex>
          <SideNavigation />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerNavigation;
