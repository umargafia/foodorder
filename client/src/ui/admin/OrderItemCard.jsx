import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import MyCard from '../../components/global/Mycard';
import OrderItem from './OrderItem';
import { getAllOrders } from '../../store/api';
import { useSelector } from 'react-redux';

export default function OrderItemCard() {
  const [orders, setOrders] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGetOrder();
  }, []);

  //get all orders
  const handleGetOrder = async () => {
    setLoading(true);
    const response = await getAllOrders({ token });
    setOrders(response?.data);
    setLoading(false);
  };

  return (
    <MyCard
      sx={{
        height: '92.5%',
        margin: 1,
        backgroundColor: 'primary.main',
        overflow: 'auto',
        p: 1,
      }}
    >
      <Typography variant="h6" color="white">
        All orders
      </Typography>
      <Divider sx={{ backgroundColor: 'white' }} />
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress size={40} sx={{ color: 'white' }} />
        </Box>
      ) : (
        orders?.map((item) => {
          return <OrderItem item={item} key={item._id} />;
        })
      )}
    </MyCard>
  );
}
