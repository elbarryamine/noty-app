import type { AppProps } from 'next/app';
import AuthProvider from '../providers/AuthProvider';
import TrpcProvider from '../providers/TrpcProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TrpcProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </TrpcProvider>
  );
}
