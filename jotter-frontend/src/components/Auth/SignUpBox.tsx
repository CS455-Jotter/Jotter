import React from 'react';
import Box from '@mui/material/Box';
import {
  Button, Grid, Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useForm, FormProvider } from 'react-hook-form';
import colorPalette from '../color/config';
import Input from '../Input/Input';

function SignUpBox() {
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
              <Typography variant="h4" color="white" fontFamily="Caveat" fontWeight={800}>SignUp</Typography>
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
