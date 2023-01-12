import getBreakpoints from '@shared/helpers/getBreakpoints';

const {isMd, isLg} = getBreakpoints();

const sizes = {
  btn: isLg ? '56px' : isMd ? '52px' : '48px',
  'btn-small': isLg ? '45px' : isMd ? '41px' : '37px',
  'btn-tiny': isLg ? '38px' : isMd ? '34px' : '30px',
  'nav-height': isLg ? '55px' : isMd ? '51px' : '47px',
  'tab-height': isLg ? '55px' : isMd ? '51px' : '47px',
  'icon-sm': '25px',
  'icon-md': '35px',
  'icon-lg': '50px',
};

export default sizes;
