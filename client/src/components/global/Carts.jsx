import React from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MyCard from './Mycard';

function Carts({ item }) {
  const navigate = useNavigate();
  function handleClick(item) {
    navigate(`/item/${item.id}`);
  }
  return (
    <Grid container sm={5} md={2} sx={{ m: 2 }}>
      <MyCard
        sx={{
          transition: 'all 1s',
          '&:hover': {
            transform: 'scale(1.1)', // Use a string to define the transform property
          },
        }}
      >
        <Box
          sx={{
            height: 200,
            width: 200,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
          onClick={() => handleClick(item)}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid
          container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography textAlign="center">{item.name}</Typography>
          <Typography fontWeight="bold">₦{item.price}</Typography>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => handleClick(item)}
          >
            View item details
          </Button>
        </Grid>
      </MyCard>
    </Grid>
  );
}

export default Carts;
