import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import MyButton from '../components/global/MyButton';
import IphoneList from '../constants/IphoneLists';
import { Add, Remove } from '@mui/icons-material';
import MyAppbar from '../components/global/MyAppbar';
import { AddToCart } from '../store/api';
function ItemPage() {
  const [item, setItem] = useState(null);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(1);
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedItem = IphoneList.find((i) => i.id === parseInt(id));
    setItem(selectedItem);
    if (price === 0 || price === 1) {
      setPrice(parseFloat(selectedItem.price));
    }
  }, [id, price]);

  if (!item) {
    return <Typography>Loading...</Typography>;
  }

  function handleAddToCart() {
    setIsAddToCart(true);
    setQuantity(1);
  }

  function toggleAddQuantity() {
    if (quantity <= 0) {
      setIsAddToCart(false);
      return;
    }
    setQuantity(quantity + 1);
    setPrice((prevPrice) => prevPrice + parseInt(item.price));
  }

  function handleRemoveQuantity() {
    if (quantity <= 0) {
      setIsAddToCart(false);
      return;
    }
    setQuantity(quantity - 1);
    setPrice((prevPrice) => prevPrice - parseInt(item.price));
  }

  async function createCart() {
    setIsLoading(true);
    const data = {
      quantity,
      product: {
        id: item.id,
        price: item.price,
      },
      totalPrice: price,
    };

    await AddToCart({ data, token });
    setIsLoading(false);
    navigate('/');
  }

  const handleBuyNow = () => {
    navigate('/order', {
      state: {
        cartInfo: {
          noOfItems: 1,
          totalPrice: parseInt(item.price),
          now: true,
          id: item.id,
        },
      },
    });
  };

  return (
    <>
      <MyAppbar />
      <Grid container>
        <Grid
          sm={12}
          md={6}
          sx={{
            bgcolor: 'primary.pureWhite',
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            py: 2,
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{ height: 'calc(100vh - 10rem ' }}
          />
        </Grid>
        <Grid
          sm={12}
          md={6}
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            flexDirection: 'column',
            pl: 10,
          }}
        >
          <Typography variant="h3" color={'primary.main'}>
            {item.name}
          </Typography>
          <Typography variant="h5" color="gray" fontWeight="bold">
            Brand: Apple
          </Typography>
          <Typography variant="h5">₦{price}</Typography>
          <Typography sx={{ mt: 2, color: 'gray' }}>
            30% OFF ON ALL ORDERS
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              mt: 5,
            }}
          >
            {!isAddToCart || quantity <= 0 ? (
              <MyButton
                text="Add to cart"
                sx={{ mt: 2 }}
                fullWidth
                onClick={handleAddToCart}
              />
            ) : (
              <Box sx={{ display: 'flex' }}>
                <Button variant="contained" onClick={toggleAddQuantity}>
                  <Add sx={{ color: 'white' }} />
                </Button>
                <Typography variant="h4" sx={{ mx: 4, color: 'primary.main' }}>
                  {quantity}
                </Typography>

                <Button variant="contained" onClick={handleRemoveQuantity}>
                  <Remove sx={{ color: 'white' }} />
                </Button>
              </Box>
            )}
            {quantity >= 1 ? (
              <MyButton
                fullWidth
                text={
                  loading ? (
                    <CircularProgress size={20} sx={{ color: 'white' }} />
                  ) : (
                    'Add to cart'
                  )
                }
                sx={{ mt: 2 }}
                onClick={createCart}
              />
            ) : (
              <MyButton
                fullWidth
                text="Buy Now"
                sx={{ mt: 2 }}
                onClick={handleBuyNow}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ItemPage;
