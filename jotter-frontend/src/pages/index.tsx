import * as React from 'react';
import Layout from '@/components/Layout/Layout';

export default function MenuAppBar() {
  return (
    <div>
      Hello
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
