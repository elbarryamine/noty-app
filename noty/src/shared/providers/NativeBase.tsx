import React, {ReactNode, useEffect} from 'react';
import {NativeBaseProvider as Provider, theme, useColorMode} from 'native-base';
import {dynamicTheme} from '@shared/theme/theme';

const DynamicThemeNativeBaseProvider = ({children}: {children: ReactNode}) => {
  const {setColorMode, colorMode} = useColorMode();

  useEffect(() => {
    setColorMode('light');
  }, []);
  return <Provider theme={dynamicTheme(colorMode === 'light')}>{children}</Provider>;
};

const NativeBaseProvider = ({children}: {children: ReactNode}) => {
  return (
    <Provider theme={theme}>
      <DynamicThemeNativeBaseProvider>{children}</DynamicThemeNativeBaseProvider>
    </Provider>
  );
};

export default NativeBaseProvider;
