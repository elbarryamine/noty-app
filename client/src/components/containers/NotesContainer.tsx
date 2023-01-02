import { Grid } from '@chakra-ui/react';
import useBreakpoints from '@shared/hooks/useBreakpoints';
import React, { ReactNode } from 'react';

function NotesContainer({ children }: { children: ReactNode }) {
  const { ltxl, ltlg } = useBreakpoints();
  return (
    <Grid
      gridRowGap="10px"
      gridColumnGap="30px"
      gridTemplateColumns={ltlg ? '1fr' : ltxl ? '1fr 1fr' : '1fr 1fr 1fr'}
    >
      {children}
    </Grid>
  );
}

export default NotesContainer;
