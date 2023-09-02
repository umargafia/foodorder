import { Box, Card, Paper, useTheme } from '@mui/material';
import React from 'react';

function MyCard({ children, sx }) {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        p: 1,
        mt: 1,
        backgroundColor: theme.palette.primary.pureWhite,
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}

export default MyCard;
