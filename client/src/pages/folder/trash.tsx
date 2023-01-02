import React from 'react';
import Head from 'next/head';
import SearchAddNewNoteNavigationLayout from '@components/layouts/SearchAddNewNoteNavigationLayout';
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
      <SearchAddNewNoteNavigationLayout>
        <Trash />
      </SearchAddNewNoteNavigationLayout>
    </>
  );
};

export default TrashFolderPage;
