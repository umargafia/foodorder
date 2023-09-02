import { Box, Divider, Drawer, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import MyButton from '../components/global/MyButton';
import { logout } from '../store/authSlice';

export default function Profile({ openProfile, handleOpenProfile }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogOut = () => {
    dispatch(logout());
    localStorage.clear();
  };

  return (
    <Drawer anchor={'right'} open={openProfile} onClose={handleOpenProfile}>
      <Grid
        sx={{
          bgcolor: 'primary.white',
          minWidth: '30vw',
          p: 3,
          minHeight: '100vh',
        }}
        container
      >
        <Grid
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              background: theme.palette.primary.main,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              px: 4.5,
              py: 3,
            }}
          >
            <Typography variant="h3" color="white">
              {user?.name.charAt(0)}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
                mt: 2,
                textTransform: 'uppercase',
                letterSpacing: 3,
                textAlign: 'center',
              }}
            >
              {user?.name}
            </Typography>
            <Typography
              sx={{ fontWeight: 'bold', textAlign: 'center', color: 'gray' }}
            >
              {user?.email}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} sx={{ mt: -30 }}>
          <Divider />
          <MyButton text="Logout" sx={{ mt: 1 }} onClick={handleLogOut} />
        </Grid>
      </Grid>
    </Drawer>
  );
}
