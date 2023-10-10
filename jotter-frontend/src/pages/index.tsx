import * as React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout/Layout';
import TextEditor from '@/components/TextEditor/TextEditor';

export default function MenuAppBar() {
  return (
    <div>
      <Head>
        <title>Jotter</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"/>
      </Head>
      <TextEditor />
    </div>
  );
}

MenuAppBar.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};