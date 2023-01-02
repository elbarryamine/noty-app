import React from 'react';
import Head from 'next/head';
import ActionsNavigationLayout from '@components/layouts/ActionsNavigationLayout';
import Favorite from '@layouts/folder/Favorite';

const FavoriteFolderPage = () => {
  return (
    <>
      <Head>
        <title>Noty</title>
        <meta name="description" content="Noty Folder Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ActionsNavigationLayout>
        <Favorite />
      </ActionsNavigationLayout>
    </>
  );
};

export default FavoriteFolderPage;
