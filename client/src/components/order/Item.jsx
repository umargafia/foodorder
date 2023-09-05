import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MyCard from '../global/Mycard';
import { InfoItemFW } from './InfoItem';
import MyButton from '../global/MyButton';
import { AddToCart, createOrder, getAddress } from '../../store/api';
import Address from './Address';
import MyModel from '../global/MyModel';
import { toggleModel } from '../../store/authSlice';
import Billing from './Billing';

function Item() {
  const location = useLocation();
  const { token, carts } = useSelector((state) => state.auth);
  const { cartInfo } = location.state;
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(false);
  const dispatch = useDispatch();
  const [togAdd, setTogAdd] = useState(true);

  useEffect(() => {
    setTotalPrice(parseInt(cartInfo.totalPrice + 1000 + 400));
  });

  const handlePayment = async () => {
    setLoading(true);

    if (cartInfo?.now === true) {
      const data = {
        quantity: 1,
        product: {
          id: cartInfo.id,
          Price: cartInfo.totalPrice,
        },
        totalPrice: cartInfo.totalPrice,
        now: true,
      };
      const createCart = await AddToCart({ token, data });
      const newOrder = await createOrder({
        token,
        cartId: createCart?.data?._id,
      });

      navigate('/recept');
      setLoading(false);
      return;
    }

    let response;
    for (const cart of carts) {
      response = await createOrder({ token, cartId: cart._id });
    }

    navigate('/recept');
    setLoading(false);
    return;
  };

  function handleAddress() {
    setTogAdd(true);
    dispatch(toggleModel());
  }
  function handleCredith() {
    setTogAdd(false);
    dispatch(toggleModel());
  }

  return (
    <MyCard sx={{ bgcolor: 'white', minHeight: '50vh', p: 3 }}>
      <MyModel>{togAdd ? <Address /> : <Billing />}</MyModel>
      <InfoItemFW title="Number of Items" text={cartInfo.noOfItems} normal />
      <InfoItemFW title="Subtotal" text={cartInfo.totalPrice} />
      <InfoItemFW title="Shipping" text="1000" />
      <InfoItemFW title="Tax" text="400" />
      <InfoItemFW title="Discount" text="000" />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button onClick={handleAddress} variant="outlined" sx={{ mt: 2 }}>
          Edith Address
        </Button>
        <Button onClick={handleCredith} variant="outlined" sx={{ mt: 2 }}>
          Edith Billing Info
        </Button>
      </Box>

      <Box sx={{ mt: '40%' }}>
        <Typography sx={{ textAlign: 'right', fontSize: 30 }}>
          ₦{totalPrice}
        </Typography>
        <Divider />
        <MyButton
          text={
            loading ? (
              <CircularProgress sx={{ color: 'primary.main' }} size={20} />
            ) : (
              `pay ₦${totalPrice}`
            )
          }
          sx={{ mt: 2 }}
          fullWidth
          disabled={loading}
          onClick={handlePayment}
        />
      </Box>
    </MyCard>
  );
}

export default Item;
