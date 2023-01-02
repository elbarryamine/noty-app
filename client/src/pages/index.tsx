import React from 'react';
import NavigationLayout from '@components/layouts/NavigationLayout';
import Head from 'next/head';
import Base from '@layouts/base';

const BasePage = () => {
  return (
    <>
      <Head>
        <title>Noty</title>
        <meta name="description" content="Noty home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationLayout>
        <Base />
      </NavigationLayout>
    </>
  );
};

export default BasePage;
