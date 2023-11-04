import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import {
  Button, Grid, Typography,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data : any) => {
    axios.post(`${baseURL}/users`, data)
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    methods.reset();
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      router.push('/');
    }
  }, [router]);

  return (
    <div style={{ width: '380px', height: '480px' }}>
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
                      <ArrowForwardIcon />
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
