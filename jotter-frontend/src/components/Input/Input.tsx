import { TextField } from '@mui/material';
import React from 'react';

interface CustomeInputProps {
    placeholder : string,
    password ?: boolean,
}
function Input({ placeholder, password = false }: CustomeInputProps) {
  return (
    <TextField
      variant="outlined"
      type={password ? 'password' : ''}
      style={{ width: '90%' }}
      InputProps={{
        style: {
          borderRadius: '40px',
          backgroundColor: 'white',
          fontFamily: 'Caveat',
        },
        placeholder,
      }}
    />
  );
}

export default Input;
