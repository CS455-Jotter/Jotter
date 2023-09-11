import React from 'react';
import { Box, Grid } from '@mui/material';
import Head from 'next/head';
import LoginBox from '@/components/Auth/LoginBox';
import styles from '@/styles/login.module.css';
import TypeWriter from '@/components/TypeWriter/TypeWriter';

function Login() {
  return (
    <>
      <Head>
        <title>Login - JOtter</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="row"
          alignItems="center"
          sx={{ minHeight: '100vh', justifyContent: { lg: 'space-around', xs: 'center' } }}
        >
          <Grid item className={styles.hide} lg={3}>
            <TypeWriter />
          </Grid>
          <Grid item lg={3} sx={{ zIndex: 1000 }}>
            <LoginBox />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Login;
