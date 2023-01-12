import {Dimensions} from 'react-native';

const getBreakpoints = () => {
  const {scale} = Dimensions.get('window');
  const isSm = scale >= 1 && scale < 2.4;
  const isMd = scale >= 2.4 && scale < 2.8;
  const isLg = scale >= 3;
  return {isSm, isMd, isLg};
};

export default getBreakpoints;
