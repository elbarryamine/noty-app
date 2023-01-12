import {bold, light, regular} from './fontsWeights';

export const Text = {
  defaultProps: {
    fontSize: 'body',
    fontWeight: regular,
  },
  variants: {
    primary: {color: 'primary-color', fontSize: 'body'},
    secondary: {color: 'secondary-text', fontSize: 'body'},
    ternary: {fontSize: 'body', fontWeight: light, color: 'red'},
    sub: {color: 'sub-text', fontWeight: light, fontSize: 'sub'},
  },
};

export const Heading = {
  defaultProps: {fontSize: 'header', fontWeight: bold},
  variants: {
    primary: {
      color: 'primary-color',
    },
    secondary: {
      color: 'sub-text',
    },
  },
};
