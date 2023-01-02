import React from 'react';
import Head from 'next/head';
import ActionsNavigationLayout from '@components/layouts/ActionsNavigationLayout';
import Folder from '@layouts/folder';

const FolderPage = () => {
  return (
    <>
      <Head>
        <title>Noty</title>
        <meta name="description" content="Noty Folder page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ActionsNavigationLayout>
        <Folder />
      </ActionsNavigationLayout>
    </>
  );
};

export default FolderPage;
