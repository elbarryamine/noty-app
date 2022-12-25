import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import Preloader from '../../components/layouts/Preloader';

function AuthProvider({ children }: { children: ReactNode }) {
  let auth = false;
  const [loaded, setLoaded] = useState(false);
  const authRoutes = ['/login', '/signup'];
  const router = useRouter();
  console.log(authRoutes.includes(router.pathname), router.pathname);
  useEffect(() => {
    console.log(!auth && !authRoutes.includes(router.pathname));
    if (!auth && !authRoutes.includes(router.pathname)) {
      router.push('/login');
    }
    setLoaded(true);
  }, [auth]);
  if (!loaded) return <Preloader />;
  return <>{children}</>;
}

export default AuthProvider;
