import {regular} from './fontsWeights';

export const Button = {
  defaultProps: {
    h: 'btn',
    borderRadius: '10px',
    variant: 'primary',
    _text: {fontSize: 'body'},
    _pressed: {opacity: 0.8},
  },
  variants: {
    primary: {
      bg: 'primary-color',
      _text: {color: 'primary-button-text'},
    },
    'primary-outline': {
      bg: 'primary-color-opacity',
      borderWidth: '1px',
      borderColor: 'primary-color',
      _text: {color: 'primary-color'},
    },
    'primary-ghost': {
      _text: {color: 'primary-color'},
    },
    secondary: {
      bg: 'transparent',
      borderWidth: '1px',
      borderColor: 'primary-border',
    },
    tab: {
      py: '30px',
      borderRadius: '0px',
      borderBottomWidth: '2px',
      borderBottomColor: 'primary-color',
      _text: {color: 'primary-color', fontWeight: regular},
    },
    'tab-unactive': {
      py: '30px',
      borderRadius: '0px',
      borderBottomWidth: '2px',
      borderBottomColor: 'transparent',
      _text: {color: 'primary-color', fontWeight: regular},
    },
    tag: {
      bg: 'primary-color-bright-opacity',
      maxH: 'btn-tiny',
      _text: {color: 'primary-color'},
    },
  },
};

export const Pressable = {
  h: 'btn',
  defaultProps: {
    _disabled: {opacity: 0.5},
    _pressed: {opacity: 0.8, borderColor: 'primary-color'},
  },
};
