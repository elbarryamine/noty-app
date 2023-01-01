import React from 'react';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('./LoginForm'));
const LoginPage = () => {
  return (
    <Box as='main' minH='100vh' display='flex' justifyContent='center' alignItems='center'>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
