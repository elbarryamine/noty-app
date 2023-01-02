import React, { ReactElement } from 'react';
import {
  Avatar,
  Box,
  Flex,
  FormControl,
  Grid,
  Icon,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Button,
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
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
        <Grid
          h="100%"
          overflow="scroll"
          borderWidth="1px"
          borderColor="whitesmoke"
          templateRows="80px 1fr"
        >
          <HStack
            px="40px"
            py="20px"
            w="100%"
            justifyContent="center"
            alignItems="center"
          >
            <FormControl w="100%" maxW="300px" mx="5px">
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
            </FormControl>
            <Button variant="primary">Add new note</Button>
          </HStack>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
}

export default NavigationLayout;
