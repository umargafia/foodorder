import React, { useEffect, useState } from 'react';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CartsItem from './CartsItem';
import MyButton from '../global/MyButton';
import { getCarts } from '../../store/api';
import { setCartsReducer, setNoOfCarts } from '../../store/authSlice';
import MyAppbar from '../global/MyAppbar';

const CartDrawer = () => {
  const { token, noOfCarts } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartsList, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [noOfItems, setNoOfItems] = useState(0);

  const fetchCarts = async () => {
    try {
      const response = await getCarts({ token });
      const fetchedCarts = response?.data?.carts.reverse();

      const total = fetchedCarts.reduce((acc, item) => {
        return acc + parseInt(item.totalPrice);
      }, 0);

      setCarts(fetchedCarts);
      dispatch(setCartsReducer(fetchedCarts));
      setNoOfItems(fetchedCarts.length);
      setTotalPrice(total);
      dispatch(setNoOfCarts(fetchedCarts.length));
    } catch (error) {}
  };

  useEffect(() => {
    fetchCarts();
  }, [noOfCarts, token]);

  const handleClick = () => {
    navigate('/order', {
      state: {
        cartInfo: {
          noOfItems,
          totalPrice,
        },
      },
    });
  };

  return (
    <>
      <MyAppbar />
      <Grid container sx={{ pt: 10 }}>
        <Grid sx={{ bgcolor: 'primary.pureWhite' }} xs={8} container>
          <Grid xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>
          <Grid xs={12} sx={{ height: '78vh', overflowY: 'auto' }}>
            {cartsList?.length === 0 ? (
              <Typography
                variant="body1"
                sx={{ p: 2, color: 'primary.main', textAlign: 'center' }}
              >
                Your cart is empty.
              </Typography>
            ) : (
              <Box>
                {cartsList?.map((item) => (
                  <CartsItem
                    item={item}
                    key={item._id}
                    fetchCarts={fetchCarts}
                  />
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
        <Grid xs={3}>
          <Box
            sx={{
              ml: 2,
              p: 3,
              backgroundColor: 'white',
              height: '80vh',
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'column',
            }}
          >
            <Grid xs={12} container>
              <Grid
                xs={12}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <ShoppingCartIcon sx={{ color: 'primary.main', mr: 'auto' }} />
                <Typography
                  variant="h6"
                  sx={{ color: 'primary.main', fontWeight: '800' }}
                >
                  {noOfItems} {noOfItems > 1 ? 'items' : 'item'}
                </Typography>
              </Grid>

              <Grid
                xs={12}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography sx={{ color: 'primary.main', mr: 'auto' }}>
                  Tax
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: 'primary.main', fontWeight: '400' }}
                >
                  100
                </Typography>
              </Grid>

              <MyButton
                text={`Checkout now (₦${totalPrice})`}
                sx={{ width: '100%' }}
                onClick={handleClick}
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CartDrawer;
