import { Box } from '@chakra-ui/layout';
import { useUserStore } from '@store/user';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import Preloader from '../../components/layouts/Preloader';

function AuthProvider({ children }: { children: ReactNode }) {
  const user = useUserStore((state) => state.token);
  const [loaded, setLoaded] = useState(false);
  const authRoutes = ['/login', '/signup'];
  const router = useRouter();

  useEffect(() => {
    setLoaded(false);
    const isAuthRoute = authRoutes.includes(router.pathname);
    if (user && isAuthRoute) {
      router.push('/').then(() => {
        setLoaded(true);
      });
    } else if (!user && !isAuthRoute) {
      router.push('/login').then(() => {
        setLoaded(true);
      });
    } else {
      setLoaded(true);
    }
  }, [user, router.pathname]);
  if (!loaded)
    return (
      <Box as='main'>
        <Preloader />
      </Box>
    );
  return <>{children}</>;
}

export default AuthProvider;
