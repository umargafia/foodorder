import { Cancel } from '@mui/icons-material';
import { Card, IconButton, Modal } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleModel } from '../../store/authSlice';

const MyModel = ({ children }) => {
  const { model } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const hamdleToggle = () => {
    dispatch(toggleModel());
  };

  const style = {
    container: {
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    childrenStyle: {
      width: '30%',
      position: 'relative',
      padding: '3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      bgcolor: 'background.paper',
    },
  };
  return (
    <Modal
      sx={style.container}
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={model}
      onClose={hamdleToggle}
      closeAfterTransition
    >
      <Card sx={style.childrenStyle}>
        <IconButton
          onClick={hamdleToggle}
          sx={{
            position: 'absolute',
            top: '0rem',
            right: '0rem',
          }}
        >
          <Cancel sx={{ fontSize: '2rem' }} />
        </IconButton>
        {children}
      </Card>
    </Modal>
  );
};

export default MyModel;
