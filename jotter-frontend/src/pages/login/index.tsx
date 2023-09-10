import React from 'react';
import { Grid } from '@mui/material';
import LoginBox from '@/components/Auth/LoginBox';

function Login() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <LoginBox />
      </Grid>
    </Grid>
  );
}

export default Login;
