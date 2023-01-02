import { useMediaQuery } from '@chakra-ui/react';
import breakpoints from '@shared/chakra/theme/breakpoints';

export default function useBreakpoints() {
  const media = useMediaQuery([
    `(max-width: ${breakpoints.xs})`, //('200px');
    `(max-width: ${breakpoints.sm})`, //('500px');
    `(max-width: ${breakpoints.md})`, //('800px');
    `(max-width: ${breakpoints.lg})`, //('1100px');
    `(max-width: ${breakpoints.xl})`, //('1400px');
  ]);
  return {
    ltxs: media[0],
    ltsm: media[1],
    ltmd: media[2],
    ltlg: media[3],
    ltxl: media[4],
  };
}
