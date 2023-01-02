import React from 'react';
import Head from 'next/head';
import NavigationLayout from '@components/layouts/NavigationLayout';
import Folder from '@layouts/folder';
import { useRouter } from 'next/router';
import Preloader from '@components/layouts/Preloader';

const FolderPage = () => {
  const router = useRouter();
  if (!router?.query?.id || typeof router?.query?.id !== 'string') {
    return <Preloader />;
  }
  return (
    <>
      <Head>
        <title>Noty</title>
        <meta name="description" content="Noty Folder page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationLayout withSubHeader>
        <Folder />
      </NavigationLayout>
    </>
  );
};

export default FolderPage;
