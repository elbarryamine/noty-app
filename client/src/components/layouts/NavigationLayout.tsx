import React, { ReactElement } from 'react';
import { Avatar, Box, Flex, Grid, HStack, Stack, Text } from '@chakra-ui/react';
import HeaderNavigation from './HeaderNavigation';
import SideNavigation from './SideNavigation';

function NavigationLayout({
  children,
}: {
  children?: ReactElement | ReactElement[];
}) {
  return (
    <Box as="main" bg="card">
      <Grid
        templateColumns="300px 1fr"
        templateRows="80px 1fr"
        h="100vh"
        w="100vw"
        overflow="hidden"
      >
        <Flex
          p="20px"
          bg="bg"
          align="center"
          justify="center"
          borderWidth="1px"
          borderColor="whitesmoke"
        >
          <HStack>
            <Avatar h="40px" w="40px" />
            <Text variant="subheader">Amine's Noty Space</Text>
          </HStack>
        </Flex>
        <Stack borderWidth="1px" borderColor="whitesmoke">
          <HeaderNavigation />
        </Stack>
        <SideNavigation />
        <Box
          px="40px"
          py="20px"
          w="100%"
          h="100%"
          overflow="scroll"
          borderWidth="1px"
          borderColor="whitesmoke"
        >
          {children}
        </Box>
      </Grid>
    </Box>
  );
}

export default NavigationLayout;
