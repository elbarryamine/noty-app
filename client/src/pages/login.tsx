import Head from 'next/head';
import React from 'react';
import LoginPage from '@layouts/login';

const Login = () => {
  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name='description' content='login page' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <LoginPage />
    </>
  );
};

export default Login;
