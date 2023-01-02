import React from 'react';
import Head from 'next/head';
import SearchAddNewNoteNavigationLayout from '@components/layouts/SearchAddNewNoteNavigationLayout';
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
      <SearchAddNewNoteNavigationLayout>
        <Folder />
      </SearchAddNewNoteNavigationLayout>
    </>
  );
};

export default FolderPage;
