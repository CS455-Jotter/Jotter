/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IconButton, InputAdornment, TextField, Tooltip,
} from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';

interface CustomeInputProps {
    placeholder : string,
    password ?: boolean,
    value ?: any,
    setValue ?: React.Dispatch<React.SetStateAction<any>>,
    name ?:string,
    rules ?: any,
    helperText ?: string,
}
function Input({
  placeholder, password = false, name = '', rules, helperText = '',
}: CustomeInputProps) {
  const { register, formState: { errors } } = useFormContext(); // retrieve all hook methods

  return (
    <TextField
      variant="outlined"
      error={!!errors[name]}
      type={password ? 'password' : ''}
      style={{ width: '90%' }}
      InputProps={{
        style: {
          borderRadius: '40px',
          border: '2px solid black',
          backgroundColor: 'white',
        },
        placeholder,
        endAdornment: (errors[name]
  && (
  <InputAdornment position="end">
    <Tooltip title={helperText}>
      <IconButton
        aria-label="toggle password visibility"
        edge="end"
      >
        <ErrorIcon color="error" />
      </IconButton>

    </Tooltip>
  </InputAdornment>
  )
        ),
      }}
      {...register(name, rules)}

    />
  );
}

export default Input;
