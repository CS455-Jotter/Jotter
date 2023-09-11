import * as React from 'react';
import Layout from '@/components/Layout/Layout';
import TextEditor from '@/components/TextEditor/TextEditor';

export default function MenuAppBar() {
  return (
    <div>
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
