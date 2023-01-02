import React, { ReactElement } from 'react';
import { Box, Flex, Grid, HStack, Stack, Text } from '@chakra-ui/react';
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
            <Text variant="subheader">Noty Space</Text>
          </HStack>
        </Flex>

        <Stack borderWidth="1px" borderColor="whitesmoke">
          <HeaderNavigation />
        </Stack>
        <SideNavigation />
        {children}
      </Grid>
    </Box>
  );
}

export default NavigationLayout;
