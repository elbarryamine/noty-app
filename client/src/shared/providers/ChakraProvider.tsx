import { ChakraProvider } from '@chakra-ui/react';
import theme from '@shared/chakra/theme';
import GloblaFonts from '@shared/chakra/theme/GloblaFonts';
import React, { ReactNode } from 'react';
import DynamicColorModeProvider from './DynamicColorModeProvider';

const Chakra = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraProvider theme={theme}>
      <GloblaFonts />
      <DynamicColorModeProvider>{children}</DynamicColorModeProvider>
    </ChakraProvider>
  );
};

export default Chakra;
