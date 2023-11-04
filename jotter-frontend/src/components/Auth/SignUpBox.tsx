import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {
  Alert,
  Button, CircularProgress, Grid, Snackbar, Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import colorPalette, { baseURL } from '../config/config';
import Input from '../Input/Input';

function SignUpBox() {
  const methods = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data : any) => {
    setIsLoading(true);
    axios.post(`${baseURL}/users`, data)
      .then(() => {
        setIsLoading(false);
        setOpen(true);
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
      });
    methods.reset();
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      router.push('/');
    }
  }, [router]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setError(false);
  };

  return (
    <div style={{ width: '380px', height: '480px' }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Account successfully created! Please login to continue.
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Account already exists!
        </Alert>
      </Snackbar>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: colorPalette.primary,
          border: '3px solid  black',
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
              width="380px"
            >
              <Typography variant="h4" color={colorPalette.black} fontWeight={800}>SignUp</Typography>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <Stack
                    direction="column"
                    alignContent="center"
                    alignItems="center"
                    spacing={3}
                    width="380px"
                  >
                    <Input
                      placeholder="Email"
                      name="email"
                      rules={{
                        requied: true,
                        pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                        setValueAs: (value) => value.trim(),
                        validate: {
                          empty: (value) => value !== '',
                        },
                      }}
                      helperText="Not a valid email!"
                    />
                    <Input
                      placeholder="Password"
                      password
                      name="password"
                      rules={{
                        requied: true,
                        minLength: 8,
                        validate: {
                          empty: (value) => value !== '',
                        },
                      }}
                      helperText="Minimum password length : 8 characters!"
                    />
                    <Input
                      placeholder="Confirm Password"
                      password
                      name="confirmPassword"
                      rules={{
                        requied: true,
                        validate: {
                          sameAsPassword: (value) => value === methods.getValues('password'),
                          empty: (value) => value !== '',
                        },
                      }}
                      helperText="Passwords don't match!"
                    />
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        backgroundColor: colorPalette.black,
                        width: '250px',
                        borderRadius: '40px',
                        ':hover': {
                          bgcolor: colorPalette.black,
                          color: 'white',
                        },
                      }}
                      type="submit"
                    >
                      {isLoading ? <CircularProgress style={{ width: '25px', height: '25px', color: 'white' }} /> : <ArrowForwardIcon />}
                    </Button>
                    <Link href="/login" style={{ textDecoration: 'none', color: '#ffffff' }}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: colorPalette.black,
                          width: '250px',
                          borderRadius: '40px',
                          ':hover': {
                            bgcolor: colorPalette.black,
                            color: 'white',
                          },
                          textTransform: 'none',
                          fontSize: 18,
                        }}
                      >
                        Already a user? Login
                      </Button>
                    </Link>
                  </Stack>
                </form>
              </FormProvider>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default SignUpBox;
