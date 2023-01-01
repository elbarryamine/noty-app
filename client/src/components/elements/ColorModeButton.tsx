import React from 'react';
import { Button, ButtonProps, HStack, Icon, Text, useColorMode } from '@chakra-ui/react';
import { WiMoonWaningCrescent5, WiDaySunny } from 'react-icons/wi';

export default function ColorModeButton(props: ButtonProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === 'light';
  return (
    <Button onClick={toggleColorMode} bg='transparent' {...props}>
      <HStack spacing='10px'>
        <Text color='text' fontWeight={400} textTransform='capitalize'>
          {!isLight ? 'Light' : 'Dark'}
        </Text>
        <Icon color='text' fontSize='xl' as={!isLight ? WiDaySunny : WiMoonWaningCrescent5} />
      </HStack>
    </Button>
  );
}
