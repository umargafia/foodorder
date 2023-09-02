import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import IphoneLists from '../../constants/IphoneLists';
import { removeCarts } from '../../store/api';

function CartsItem({ item, fetchCarts }) {
  const theme = useTheme();
  const [curItem, setItem] = useState('');
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const id = item.product * 1;

  useEffect(() => {
    const selectedItem = IphoneLists.find((i) => i.id === parseInt(id));
    setItem(selectedItem);
  }, [id]);

  const handleNavigate = () => {
    navigate(`/item/${id}`);
  };

  const handleRemove = async () => {
    setLoading(true);
    await removeCarts({ token, cartID: item._id });
    fetchCarts();
    setLoading(false);
  };

  return (
    <Grid container sx={{ ml: 2, maxWidth: '100%', display: 'flex' }}>
      <Grid
        container
        sx={{
          mr: 'auto',
        }}
        xs={12}
      >
        <Grid xs={3} sx={{ cursor: 'pointer' }} onClick={handleNavigate}>
          <img
            src={curItem?.image}
            alt={curItem?.name}
            style={{ width: '100px', height: '100px' }}
          />
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            mr: 'auto',
            ml: 2,
          }}
        >
          <Typography
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
              fontsize: '16px',
              color: theme.palette.primary.main,
              fontWeight: 'bold',
            }}
          >
            {curItem?.name}
          </Typography>
          <Typography color="gray">
            ₦{curItem?.price} * {item?.quantity} Items
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }}>
            ₦{item?.totalPrice}
          </Typography>
        </Grid>
        <Grid>
          <IconButton onClick={handleRemove}>
            {loading ? (
              <CircularProgress size={20} sx={{ color: 'primary' }} />
            ) : (
              <ClearIcon />
            )}
          </IconButton>
        </Grid>
      </Grid>
      <Divider sx={{ width: '100%', my: 1 }} />
    </Grid>
  );
}

export default CartsItem;
