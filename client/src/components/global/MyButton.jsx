import { Button } from '@mui/material';
import React from 'react';

export default function MyButton({
  text,
  variant,
  sx,
  onClick,
  fullWidth,
  disabled,
}) {
  return (
    <Button
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled}
      variant={variant ? variant : 'contained'}
      sx={{ pt: 1.2, color: 'white', ...sx }}
    >
      {text}
    </Button>
  );
}
