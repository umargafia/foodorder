import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { Divider, Typography } from '@mui/material';

function AdsItem({ item }) {
  return (
    <Grid container width={200} sx={{ display: 'flex', alignItems: 'center' }}>
      <Grid sm={3}>{item.icon}</Grid>
      <Grid sm={9}>
        <Typography sx={{ fontSize: 15 }}>{item.title}</Typography>
        <Typography sx={{ fontSize: 13, color: 'primary.main' }}>
          {item.text}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default AdsItem;
