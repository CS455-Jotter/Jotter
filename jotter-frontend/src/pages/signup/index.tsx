import React from 'react';
import { Grid } from '@mui/material';
import SignUpBox from '@/components/Auth/SignUpBox';
import Layout from '@/components/Layout/Layout';

function SignUp() {
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '90vh' }}
      >
        <Grid item xs={3}>
          <SignUpBox />
        </Grid>
      </Grid>

    </div>
  );
}

SignUp.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default SignUp;
