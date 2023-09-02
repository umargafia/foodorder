import { Box } from '@mui/material';
import React from 'react';

function Row({ children, sx, center }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: center ? 'center' : 'flex-start',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default Row;
