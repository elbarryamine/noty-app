import SignupPage from '@components/layouts/signup';
import Head from 'next/head';
import React from 'react';

const Signup = () => {
  return (
    <>
      <Head>
        <title>Signup Page</title>
        <meta name='description' content='signup page' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SignupPage />
    </>
  );
};

export default Signup;
