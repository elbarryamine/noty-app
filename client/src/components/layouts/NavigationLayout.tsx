import React, { ReactElement } from 'react';
import {
  Box,
  Flex,
  // FormControl,
  Grid,
  // Icon,
  HStack,
  // Input,
  // InputGroup,
  // InputLeftElement,
  Stack,
  Text,
} from '@chakra-ui/react';
// import { AiOutlineSearch } from 'react-icons/ai';
import HeaderNavigation from './HeaderNavigation';
import SideNavigation from './SideNavigation';
import NewNote from './NewNote';
import { useRouter } from 'next/router';
import useBreakpoints from '@shared/hooks/useBreakpoints';

function NavigationLayout({
  children,
  withSubHeader = false,
}: {
  children?: ReactElement | ReactElement[];
  withSubHeader?: boolean;
}) {
  const router = useRouter();
  const { ltxl } = useBreakpoints();
  return (
    <Box as="main" bg="card">
      <Grid
        templateColumns={ltxl ? '1fr' : '300px 1fr'}
        templateRows="80px 1fr"
        h="100vh"
        w="100vw"
        overflow="hidden"
      >
        {!ltxl && (
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
        )}

        <Stack borderWidth="1px" borderColor="whitesmoke">
          <HeaderNavigation />
        </Stack>
        {!ltxl && <SideNavigation />}
        <Grid
          h="100%"
          overflow="scroll"
          borderWidth="1px"
          borderColor="whitesmoke"
          templateRows={withSubHeader ? '80px 1fr' : '1fr'}
        >
          {withSubHeader && (
            <HStack
              px="40px"
              py="20px"
              w="100%"
              justifyContent="center"
              alignItems="center"
            >
              {/* <FormControl w="100%" maxW="300px" mx="5px">
                <InputGroup>
                  <InputLeftElement
                    px="10px"
                    children={<Icon as={AiOutlineSearch} />}
                  />
                  <Input
                    bg="bg"
                    border="0"
                    outline="0"
                    rounded="md"
                    placeholder="Search for notes"
                  />
                </InputGroup>
              </FormControl> */}
              {typeof router.query.id === 'string' && (
                <NewNote folderId={router.query.id} />
              )}
            </HStack>
          )}
          {children}
        </Grid>
      </Grid>
    </Box>
  );
}

export default NavigationLayout;
