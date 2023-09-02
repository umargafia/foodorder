import { Box, Typography } from '@mui/material';
import React from 'react';

function InfoItem({ title, text }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography
        sx={{ mr: 1, textTransform: 'capitalize', fontWeight: 'bold' }}
      >
        {title}:
      </Typography>
      <Typography sx={{ color: 'GrayText' }}>{text}</Typography>
    </Box>
  );
}

export default InfoItem;

export function InfoItemFW({ title, text, normal }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography sx={{ mr: 'auto', fontWeight: 'bold' }}>{title}:</Typography>
      <Typography>
        {!normal && '₦'}
        {text}
      </Typography>
    </Box>
  );
}
