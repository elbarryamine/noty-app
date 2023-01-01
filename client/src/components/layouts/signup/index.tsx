import { Box } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';
import React from 'react';
const SignupForm = dynamic(() => import('./SignupForm'), { ssr: true });

const SignupPage = () => {
  return (
    <Box as='main' minH='100vh' display='flex' justifyContent='center' alignItems='center'>
      <SignupForm />
    </Box>
  );
};

export default SignupPage;
