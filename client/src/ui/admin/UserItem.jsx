import React from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Button, Card, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import Row from '../../components/global/Row';
import { removeUser } from '../../store/api';

function UserItem({ item }) {
  console.log(item);
  const { token } = useSelector((state) => state.auth);
  const handleRemoveUser = async () => {
    const response = await removeUser({ token, id: item._id });
    console.log(response);
  };
  return (
    <Grid sx={{ m: 2 }}>
      <Card sx={{ p: 1 }}>
        <Option header="Name" title={item?.name} />
        <Option header="Email" title={item?.email} />
        <Option header="Username" title={item?.username} />
        <Option header="Role" title={item?.role} />
        <Button
          onClick={handleRemoveUser}
          sx={{
            bgcolor: 'error.main',
            color: 'white',
            '&:hover': { bgcolor: 'error.main', opacity: [0.9, 0.8, 0.7] },
          }}
          fullWidth
        >
          Remove user
        </Button>
      </Card>
    </Grid>
  );
}

export default UserItem;

const Option = ({ header, title }) => {
  return (
    <Row>
      <Typography sx={{ fontWeight: 'bold', mr: 1 }}>{header}:</Typography>
      <Typography>{title}</Typography>
    </Row>
  );
};
