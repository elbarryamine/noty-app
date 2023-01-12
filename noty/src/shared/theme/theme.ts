import {extendTheme} from 'native-base';
import fontSizes from './fontSizes';
import fontConfig from './fontConfig';
import components from './components';
import fonts from './fonts';
import getColors from './colors';
import sizes from './sizes';

export const theme = extendTheme({
  config: {initialColorMode: 'light'},
  components,
  fontConfig,
  sizes,
  fontSizes,
  fonts,
});

export const dynamicTheme = (isLight: boolean) =>
  extendTheme({
    ...theme,
    colors: getColors(isLight),
  });
