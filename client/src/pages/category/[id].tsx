import React from 'react';
import Head from 'next/head';
import NavigationLayout from '@components/layouts/NavigationLayout';
import Category from '@layouts/category';

const CategoryPage = () => {
  return (
    <>
      <Head>
        <title>Noty</title>
        <meta name="description" content="Noty Category page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationLayout>
        <Category />
      </NavigationLayout>
    </>
  );
};

export default CategoryPage;
