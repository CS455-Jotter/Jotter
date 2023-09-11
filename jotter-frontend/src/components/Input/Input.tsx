/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface CustomeInputProps {
    placeholder : string,
    password ?: boolean,
    value ?: any,
    setValue ?: React.Dispatch<React.SetStateAction<any>>,
    name ?:string,
    rules ?: any,
}
function Input({
  placeholder, password = false, name = '', rules,
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
          backgroundColor: 'white',
          fontFamily: 'Caveat',
        },
        placeholder,
      }}
      {...register(name, rules)}
    />
  );
}

export default Input;
