import type { AppProps } from 'next/app';
import AuthProvider from '@shared/providers/AuthProvider';
import { trpc } from '../utils/trpc';
import '@styles/tailwind.css';
import '@styles/loader.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default trpc.withTRPC(App);
