import { Grid } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

function NotesContainer({ children }: { children: ReactNode }) {
  return (
    <Grid
      gridRowGap="10px"
      gridColumnGap="30px"
      gridTemplateColumns="500px 500px 500px"
    >
      {children}
    </Grid>
  );
}

export default NotesContainer;
