import React from 'react';
import Row from '../global/Row';
import { Box, Divider, Typography } from '@mui/material';

function ReceiptItem({ item }) {
  return (
    <>
      <Row sx={{ m: 1 }}>
        <Row>
          <img src={item.image} alt={item.name} style={{ height: 120 }} />
          <Box sx={{ pl: 1, pt: 1 }}>
            <Typography color="primary" variant="h5" fontWeight="bold">
              {item.name}
            </Typography>
            <Typography>{item.status}</Typography>
            <Typography>{item.quantity} items</Typography>
            <Typography>₦{item.totalPrice}</Typography>
          </Box>
        </Row>
      </Row>
      <Divider />
    </>
  );
}

export default ReceiptItem;
