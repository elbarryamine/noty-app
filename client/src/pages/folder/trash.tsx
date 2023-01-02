import React from 'react';
import Head from 'next/head';
import ActionsNavigationLayout from '@components/layouts/ActionsNavigationLayout';
import Trash from '@layouts/folder/Trash';

const TrashFolderPage = () => {
  return (
    <>
      <Head>
        <title>Noty</title>
        <meta name="description" content="Noty Folder Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ActionsNavigationLayout>
        <Trash />
      </ActionsNavigationLayout>
    </>
  );
};

export default TrashFolderPage;
