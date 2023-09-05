import { Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Profile from '../../screens/Profile';
import { logout } from '../../store/authSlice';

function MyAppbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { noOfCarts, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen((pre) => !pre);
  };

  const handleOpenProfile = () => {
    dispatch(logout());
    localStorage.clear();
  };

  return (
    <AppBar position="absolute">
      <Profile
        openProfile={openProfile}
        handleOpenProfile={handleOpenProfile}
      />
      <Toolbar sx={{ mx: 10, display: 'flex' }}>
        <Box sx={{ mr: '60%' }}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={() => {
              navigate('/');
            }}
          >
            <Typography color="white">Home</Typography>
          </IconButton>

          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={() => navigate('/cart')}
          >
            <Typography color="white">Carts</Typography>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={() => {
              navigate('/recept');
            }}
          >
            <Typography color="white">Orders</Typography>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={handleOpenProfile}
          >
            <Typography
              sx={{
                mt: 0.5,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: 'error.main',
              }}
            >
              Logout
            </Typography>
          </IconButton>
        </Box>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          <Button
            sx={{
              color: '#fff',
              alignItems: 'center',
              display: 'flex',
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            <SoupKitchenIcon color="white" /> Food Store
          </Button>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default MyAppbar;
