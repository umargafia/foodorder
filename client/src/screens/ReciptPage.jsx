import { Box, Card, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MyAppbar from '../components/global/MyAppbar';
import Mycard from '../components/global/Mycard';
import ReceiptItem from '../components/recipt/ReciptItem';
import { getOrders } from '../store/api';
import IphoneLists from '../constants/IphoneLists';
import Billing from '../components/order/Billing';
import Address from '../components/order/Address';

export default function ReceptPage() {
  const { token } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGetOrders();
  }, []);

  const handleGetOrders = async () => {
    setLoading(true);
    try {
      const response = await getOrders({ token });
      const updatedOrders = mapOrdersWithProducts(response.data);
      setOrders(updatedOrders.reverse());
      console.log(updatedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  };

  const mapOrdersWithProducts = (data) => {
    return data.map((item) => {
      const cartId = item?.cartId?.product;
      const iphone = IphoneLists.find((i) => i.id === parseInt(cartId));
      return {
        name: iphone?.name,
        image: iphone?.image,
        status: item?.status,
        totalPrice: item?.cartId?.totalPrice,
        quantity: item?.cartId?.quantity,
        id: item._id,
      };
    });
  };

  return (
    <>
      <MyAppbar />
      <Box display="flex" sx={{ mt: 10 }}>
        <Mycard
          sx={{ mb: 1, height: '90vh', overflowY: 'auto', p: 2, flex: 3 }}
        >
          <Typography variant="h4" color="primary">
            Orders
          </Typography>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90%',
              }}
            >
              <CircularProgress />
            </Box>
          ) : orders.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90%',
              }}
            >
              <Typography variant="h4" color="primary">
                No orders
              </Typography>
            </Box>
          ) : (
            orders.map((item) => {
              return <ReceiptItem item={item} key={item.id} />;
            })
          )}
        </Mycard>
        <Box sx={{ mb: 2, p: 2, flex: 1 }}>
          <Grid container>
            <Grid sm={12} width="100%">
              <Card>
                <Billing />
              </Card>
            </Grid>
            <Grid sm={12} width="100%" sx={{ mt: 5 }}>
              <Card>
                <Address />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
