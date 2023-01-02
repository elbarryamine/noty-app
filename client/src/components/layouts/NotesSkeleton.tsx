import { Skeleton } from '@chakra-ui/react';
import React from 'react';

function NotesSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton
          startColor="blackAlpha"
          endColor="blackAlpha.100"
          h="200px"
          key={i}
        />
      ))}
    </>
  );
}

export default NotesSkeleton;
