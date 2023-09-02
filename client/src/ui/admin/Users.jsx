import { Box, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserItem from './UserItem';
import { useSelector } from 'react-redux';

import { getAllUsers } from '../../store/api';

export default function Users() {
  const { token } = useSelector((state) => state.auth);
  const [users, setUsers] = useState();

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const response = await getAllUsers({ token });
    setUsers(response?.data);
  };

  return (
    <Box>
      <Typography color="white" variant="h5" fontWeight="bold">
        Users
      </Typography>
      <Divider sx={{ bgcolor: 'white' }} />
      {users?.map((item) => (
        <UserItem item={item} key={item._id} />
      ))}
    </Box>
  );
}
