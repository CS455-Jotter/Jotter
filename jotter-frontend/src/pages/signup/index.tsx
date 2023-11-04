import React from 'react';
import { Grid } from '@mui/material';
import Head from 'next/head';
import SignUpBox from '@/components/Auth/SignUpBox';

function SignUp() {
  return (
    <>
      <Head>
        <title>SignUp - JOtter</title>
      </Head>
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

    </>
  );
}

export default SignUp;
