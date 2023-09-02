import { Box } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import MyAppbar from '../components/global/MyAppbar';
import Address from '../components/order/Address';
import Item from '../components/order/Item';
import Billing from '../components/order/Billing';

function OrderPage() {
  return (
    <Box sx={{ background: 'primary.white', minHeight: '83vh' }}>
      <MyAppbar />
      <Grid container spacing={2}>
        <Grid sm={4}>
          <Address />
        </Grid>
        <Grid sm={4}>
          <Item />
        </Grid>
        <Grid sm={4}>
          <Billing />
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrderPage;
