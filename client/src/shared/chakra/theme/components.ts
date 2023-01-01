import fontSizes from './fontSizes';

export default {
  Button: {
    baseStyle: {
      fontWeight: 400,
    },
    defaultProps: {},
    variants: {
      primary: {
        bg: 'primary',
        color: 'primaryText',
        _loading: { bg: 'gray.100' },
      },
      ghost: {
        color: 'text',
      },
    },
  },
  Text: {
    defaultProps: {},
    variants: {
      subheader: {
        fontSize: fontSizes.header,
        fontWeight: '500',
      },
      sub: {
        fontSize: fontSizes.sub,
        color: 'subText',
      },
      display: {
        fontSize: fontSizes.display,
      },
    },
  },
  Input: {
    defaultProps: {
      colorSheme: 'blue',
    },
  },
  Textarea: {
    defaultProps: {
      colorSheme: 'blue',
    },
  },
};
