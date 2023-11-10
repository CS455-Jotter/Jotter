import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Alert,
  Button, CircularProgress, Fab, Grid, Slide, Snackbar, Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Input from '../Input/Input';
import colorPalette, { baseURL } from '../config/config';

function LoginBox() {
  const methods = useForm();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('username', data.email);
    formData.append('password', data.password);

    axios.post(`${baseURL}/login`, formData)
      .then((res) => {
        localStorage.setItem('access_token', res.data.access_token);
        router.push('/');
        setIsLoading(false);
      })
      .catch(() => {
        setOpen(true);
        setIsLoading(false);
      });
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
  };

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div style={{
      width: '380px', height: '480px',
    }}
    >
      <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
        <Fab
          variant="extended"
          style={{
            backgroundColor: colorPalette.primary,
            height: '50px',
            fontWeight: '800',
            fontSize: '16px',
            borderRadius: '0px 50px 50px 0px',
            position: 'fixed',
            left: 0,
            top: 100,
          }}
          onClick={() => {
            router.push('/');
          }}
        >
          <EditIcon
            sx={{ mr: 1 }}
            style={{
              height: '30px',
              width: '30px',
            }}
          />
          Go to Editor!
        </Fab>
      </Slide>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Wrong email or password!
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
              <Typography variant="h4" color={colorPalette.black} fontWeight={800}>Login</Typography>
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
                      helperText="Incorrect email!"
                    />
                    <Input
                      placeholder="Password"
                      password
                      name="password"
                      rules={{
                        requied: true,
                        validate: {
                          empty: (value) => value !== '',
                        },
                      }}
                      helperText="Incorrect password!"
                    />
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        backgroundColor: colorPalette.black,
                        width: '250px',
                        height: '40px',
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
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: colorPalette.black,
                        width: '250px',
                        height: '40px',
                        borderRadius: '40px',
                        ':hover': {
                          bgcolor: colorPalette.black,
                          color: 'white',
                        },
                        textTransform: 'none',
                        fontSize: 18,
                      }}
                      onClick={() => {
                        router.push('/signup');
                      }}
                    >
                      Not a user? Sign up
                    </Button>
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

export default LoginBox;
