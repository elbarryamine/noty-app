import { useMediaQuery } from '@chakra-ui/react';
import breakpoints from '@shared/chakra/theme/breakpoints';

export default function useBreakpoints() {
  const media = useMediaQuery([
    `(max-width: ${breakpoints.sm})`,
    `(max-width: ${breakpoints.md})`,
    `(max-width: ${breakpoints.lg})`,
    `(max-width: ${breakpoints.xl})`,
    `(max-width: ${breakpoints['2xl']})`,
  ]);
  return media;
}
