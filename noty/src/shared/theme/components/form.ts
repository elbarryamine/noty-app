import {light} from './fontsWeights';

export const FormControlLabel = {
  defaultProps: {
    flexDir: 'row-reverse', // to reverse asterik
    flexWrap: 'wrap',
    alignSelf: 'flex-end',
    variant: 'default',
    _text: {
      textAlign: 'right',
    },
  },
  variants: {
    default: {
      _text: {
        color: 'secondary-text',
        fontWeight: light,
        fontSize: 'body',
      },
    },
    primary: {
      _text: {
        color: 'sub-text',
        fontSize: 'body',
      },
    },
  },
};
