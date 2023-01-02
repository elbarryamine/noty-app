import React, { ReactNode } from 'react';
import { Stack, StackProps } from '@chakra-ui/react';

const BaseContainer = ({
  children,
  ...props
}: { children: ReactNode } & StackProps) => {
  return (
    <Stack
      spacing={10}
      px="40px"
      py="20px"
      pb="50px"
      overflowY="scroll"
      h="100%"
      {...props}
    >
      {children}
    </Stack>
  );
};

export default BaseContainer;
