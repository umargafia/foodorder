import { Box, TextField } from '@mui/material';
import React from 'react';

function MyInput({ text, type, props }) {
  return (
    <TextField
      fullWidth
      variant="standard"
      placeholder={text}
      type={type}
      {...props}
      sx={{ m: 2 }}
    />
  );
}

export default MyInput;
