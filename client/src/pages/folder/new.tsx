import React from 'react';
import Head from 'next/head';
import NavigationLayout from '@components/layouts/NavigationLayout';
import Create from '@layouts/folder/Create';

const CreateFolderPage = () => {
  return (
    <>
      <Head>
        <title>Noty</title>
        <meta name="description" content="Noty Folder Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationLayout>
        <Create />
      </NavigationLayout>
    </>
  );
};

export default CreateFolderPage;
