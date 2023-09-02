import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.white',
        height: 100,
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Typography sx={{ fontWeight: 'bold' }}>
        Copyright © 2023 AppleStore Inc.
      </Typography>
    </Box>
  );
}
