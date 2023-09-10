import React from 'react';
import Box from '@mui/material/Box';
import {
  Button, Grid, Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import colorPalette from '../color/config';
import Input from '../Input/Input';

function LoginBox() {
  return (
    <div style={{ width: '400px', height: '480px' }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: colorPalette.dark,
          borderRadius: 10,
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '100%', width: '100%' }}
        >
          <Grid item xs={3}>
            <Stack
              direction="column"
              alignContent="center"
              alignItems="center"
              spacing={3}
              width="400px"
            >
              <Typography variant="h4" color="white" fontFamily="Caveat" fontWeight={800}>Login</Typography>
              <Input placeholder="Email" />
              <Input placeholder="Password" password />
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: colorPalette.darker,
                  width: '50%',
                  borderRadius: '40px',
                  ':hover': {
                    bgcolor: colorPalette.darker,
                    color: 'white',
                  },
                }}
              >
                <ArrowForwardIcon />
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: colorPalette.darker,
                  width: '50%',
                  borderRadius: '40px',
                  ':hover': {
                    bgcolor: colorPalette.darker,
                    color: 'white',
                  },
                  fontFamily: 'Caveat',
                  textTransform: 'none',
                  fontSize: 15,
                }}
              >
                <Link href="/signup" style={{ textDecoration: 'none', color: '#ffffff' }}>Not a user? Sign up</Link>
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default LoginBox;
