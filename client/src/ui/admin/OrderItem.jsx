import {
  Avatar,
  Button,
  CardContent,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect, useState } from 'react';

import MyCard from '../../components/global/Mycard';
import image from '../../assets/12.jpg';
import IphoneList from '../../constants/IphoneLists';
import FormatDate from '../../constants/FormatDate';
import { useSelector } from 'react-redux';
import { updateOrder } from '../../store/api';

function OrderItem({ item }) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState('');
  const [iphone, setIphone] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const curIphone = IphoneList.find(
      (i) => i.id === parseInt(item.cart.product)
    );
    setIphone(curIphone);

    const statusMap = {
      pending: 10,
      processing: 20,
      shipped: 30,
      delivered: 40,
    };
    setStatus(statusMap[item.status]);
  }, [item, IphoneList]);

  const handleChange = async (event) => {
    const value = event.target.value;
    setStatus(value);

    let newStatus;
    if (value === 10) {
      newStatus = 'pending';
    } else if (value === 20) {
      newStatus = 'processing';
    } else if (value === 30) {
      newStatus = 'shipped';
    } else if (value === 40) {
      newStatus = 'delivered';
    }

    const response = await updateOrder({
      id: item._id,
      status: newStatus,
      token,
    });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <MyCard>
      <Grid container sx={{ m: 1 }}>
        <Grid xs={12} container>
          <Grid xs={1} sx={{ mr: 2 }}>
            <Avatar sx={{ p: 1 }}>
              <Typography variant="h5">{item?.user?.name.charAt(0)}</Typography>
            </Avatar>
          </Grid>
          <Grid sx={{ ml: 2 }}>
            <Typography fontWeight="bold" textTransform="capitalize">
              {item?.user?.name}
            </Typography>
            <Typography color="gray" fontSize={15}>
              {item?.user?.email}
            </Typography>
          </Grid>
        </Grid>
        <Grid xs={12} container sx={{ mt: 2 }}>
          <Grid sx={{ mt: 1, height: 110 }}>
            <img src={image} style={{ height: '100%' }} />
          </Grid>
          <Grid sx={{ mt: 1, ml: 2 }}>
            <Typography variant="h5" fontWeight="bold" color="primary">
              {iphone?.name}
            </Typography>
            <Typography>{item?.cart?.quantity}, Items</Typography>
            <Typography color="gray">
              Ordered on {FormatDate(item.createdAt)}
            </Typography>
            <Typography>N{item.cart.totalPrice}</Typography>
          </Grid>
        </Grid>
        <Grid xs={12} sx={{ m: 1, mt: 3 }}>
          <Button variant="outlined" fullWidth onClick={handleExpandClick}>
            {expanded ? 'Hide' : 'Show more'}
          </Button>
        </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {item?.address ? (
              <>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  Address
                </Typography>
                <Typography paragraph>
                  Country: {item.address.country}
                </Typography>
                <Typography paragraph>State: {item.address.state}</Typography>
                <Typography paragraph>
                  Local government: {item.address.localGov}
                </Typography>
                <Typography paragraph>street: {item.address.street}</Typography>
                <Typography paragraph>
                  Zip code: {item.address.zipCode}{' '}
                </Typography>
              </>
            ) : (
              <CardContent>
                <Typography paragraph>No Address</Typography>
              </CardContent>
            )}
            <FormControl fullWidth sx={{ mb: 2, mt: 2 }} variant="standard">
              <InputLabel id="demo-simple-select-label">
                Order Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={10}>pending</MenuItem>
                <MenuItem value={20}>processing</MenuItem>
                <MenuItem value={30}>shipped</MenuItem>
                <MenuItem value={40}>delivered</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Collapse>
      </Grid>
    </MyCard>
  );
}

export default OrderItem;
