import getBreakpoints from '@shared/helpers/getBreakpoints';

const {isSm} = getBreakpoints();
const fontSizes = {
  mono: isSm ? '8px' : '10px',
  sub: isSm ? '12px' : '14px',
  body: isSm ? '14px' : '16px',
  subheader: isSm ? '16px' : '18px',
  header: isSm ? '18px' : '20px',
  display: isSm ? '20px' : '26px',
};

export default fontSizes;
