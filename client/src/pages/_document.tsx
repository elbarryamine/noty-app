import { ColorModeScript } from '@chakra-ui/color-mode';
import theme from '@shared/chakra/theme';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} storageKey='noty-app-theme' />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
