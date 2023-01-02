import { ThemeOverride } from '@chakra-ui/react';
import { dynamicColors } from './colors';

type GlobalStyles = Pick<ThemeOverride, 'styles'>;

export default {
  config: {
    initialColorMode: 'light',
  },
  styles: {
    global: ({ colorMode }) => ({
      '*,html,body': {
        margin: 0,
        padding: 0,
        flexWrap: 'nowrap',
        color: dynamicColors(colorMode == 'dark').text,
        boxSizing: 'border-box',
        fontFamily: "'Baloo 2', cursive",
      },
      body: {
        background: dynamicColors(colorMode == 'dark').bg,
      },
      '.box-focus:focus-within': {
        border: '2px dashed',
      },
    }),
  },
  zIndices: {
    navigation: 99,
  },
} as GlobalStyles;
