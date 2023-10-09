import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Button, Grid, Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import colorPalette from '../color/config';

function LoginBox() {
  const methods = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data : any) => {
    // eslint-disable-next-line no-console
    console.log('Data: ');
    // eslint-disable-next-line no-console
    console.log(data);
    methods.reset();
  };

  return (
    <div style={{ width: '380px', height: '480px' }}>
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
              width="380px"
            >
              <Typography variant="h4" color="white" fontFamily="Caveat" fontWeight={800}>Login</Typography>
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
                      type="submit"
                    >
                      <ArrowForwardIcon />
                    </Button>
                    <Link href="/signup" style={{ textDecoration: 'none', color: '#ffffff' }}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: colorPalette.darker,
                          width: '100%',
                          borderRadius: '40px',
                          ':hover': {
                            bgcolor: colorPalette.darker,
                            color: 'white',
                          },
                          fontFamily: 'Caveat',
                          textTransform: 'none',
                          fontSize: 18,
                        }}
                      >
                        Not a user? Sign up
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

export default LoginBox;
