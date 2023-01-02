import React from 'react';
import Head from 'next/head';
import NavigationLayout from '@components/layouts/NavigationLayout';
import Favorite from '@layouts/category/Favorite';

const CategoryPage = () => {
  return (
    <>
      <Head>
        <title>Noty</title>
        <meta name="description" content="Noty Category Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationLayout>
        <Favorite />
      </NavigationLayout>
    </>
  );
};

export default CategoryPage;
