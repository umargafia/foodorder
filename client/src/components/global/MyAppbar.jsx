import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import AppleIcon from '@mui/icons-material/Apple';
import { Home } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartDrawer from '../cart/Cart';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Profile from '../../screens/Profile';
import { useSelector } from 'react-redux';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
function MyAppbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { noOfCarts, user } = useSelector((state) => state.auth);

  const handleOpen = () => {
    setOpen((pre) => !pre);
  };

  const handleOpenProfile = () => {
    setOpenProfile((pre) => !pre);
  };

  function handleClick(e) {
    console.log(e);
  }

  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <CartDrawer open={open} handleOpen={handleOpen} />
      <Profile
        openProfile={openProfile}
        handleOpenProfile={handleOpenProfile}
      />
      <Toolbar sx={{ mx: 10 }}>
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
            <AppleIcon sx={{ mt: -1 }} />
            Store
          </Button>
        </Typography>
        <Box>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={() => {
              navigate('/');
            }}
          >
            <Home color="white" sx={{ color: 'white', fontSize: 35 }} />
          </IconButton>

          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={handleOpen}
          >
            <Badge badgeContent={noOfCarts} color="error">
              <ShoppingCartIcon sx={{ color: 'white', fontSize: 35 }} />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={() => {
              navigate('/recept');
            }}
          >
            <LocalShippingIcon
              color="white"
              sx={{ color: 'white', fontSize: 35 }}
            />
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={handleOpenProfile}
          >
            <Avatar>
              <Typography
                sx={{ mt: 0.5, fontWeight: 'bold', textTransform: 'uppercase' }}
              >
                {user.name.charAt(0)}
              </Typography>
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MyAppbar;
