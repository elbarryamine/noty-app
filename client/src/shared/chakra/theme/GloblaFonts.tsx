import React from 'react';
import { Global } from '@emotion/react';

const GloblaFonts = () => {
  return (
    <Global
      styles={`
      /* Quicksand */
      @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
      `}
    />
  );
};

export default GloblaFonts;
