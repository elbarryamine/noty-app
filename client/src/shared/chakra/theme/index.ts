import {
  AccordionButton,
  Button,
  DrawerCloseButton,
  extendTheme,
  Heading,
  Input,
  NumberInput,
  Textarea,
} from '@chakra-ui/react';
import styles from './styles';
import { colors } from './colors';
import fontSizes from './fontSizes';
import sizes from './sizes';
import font from './fontFamily';
import components from './components';
import breakpoints from './breakpoints';

const focus = {};
const focusButton = {};

Heading.defaultProps = {
  as: 'h1',
};
Button.defaultProps = { ...Button.defaultProps, _focus: focusButton, _hover: { opacity: 0.8 } };
AccordionButton.defaultProps = { ...AccordionButton.defaultProps, _focus: focusButton, _hover: { opacity: 0.8 } };
DrawerCloseButton.defaultProps = { ...DrawerCloseButton.defaultProps, _focus: focusButton, _hover: { opacity: 0.8 } };
Input.defaultProps = { ...Input.defaultProps, _focus: focus };
NumberInput.defaultProps = { ...NumberInput.defaultProps, _focus: focus };
Textarea.defaultProps = { ...Textarea.defaultProps, _focus: focus };

const overrides = {
  config: {
    initialColorMode: 'light',
  },
  ...styles,
  colors,
  fontSizes,
  components,
  font,
  sizes,
  breakpoints,
};

const theme = extendTheme(overrides);

export default theme;
