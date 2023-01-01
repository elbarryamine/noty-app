import { Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import React from 'react';

const Preloader = () => {
  return (
    <Flex h='100vh' w='100vw' align='center' justify='center'>
      <Spinner />
    </Flex>
  );
};

export default Preloader;
