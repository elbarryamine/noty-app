import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import Preloader from '../components/layouts/Preloader';

function AuthProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  let auth = true;
  const router = useRouter();
  useEffect(() => {
    if (!auth) {
      router.push('/login');
    }
    setLoaded(true);
  }, [auth]);
  if (!loaded) return <Preloader />;
  return <>{children}</>;
}

export default AuthProvider;
