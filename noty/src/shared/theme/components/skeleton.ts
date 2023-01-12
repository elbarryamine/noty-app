export const Skeleton = {
  defaultProps: {borderRadius: '8px'},
  variants: {
    primary: {
      startColor: 'primary-color-bright-opacity',
      endColor: 'primary-color-bright',
    },
  },
};

export const SkeletonText = {
  variants: {
    primary: {
      _line: {
        startColor: 'primary-color-bright-opacity',
        endColor: 'primary-color-bright',
      },
    },
  },
};
