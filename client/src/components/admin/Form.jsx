import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MyInput from '../global/MyInput';
import MyButton from '../global/MyButton';
import { createUser } from '../../store/api';
import { toggleModel } from '../../store/authSlice';

function AddUserForm() {
  const [state, setState] = useState('');
  const { token } = useSelector((state) => state.auth);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: '',
  });

  const handleChange = async (event) => {
    const value = event.target.value;
    setState(value);
    if (value === 10) {
      setUserData((prev) => {
        return {
          ...prev,
          role: 'user',
        };
      });
    } else if (value === 20) {
      setUserData((prev) => {
        return {
          ...prev,
          role: 'admin',
        };
      });
    }
  };

  const handleAddUserUpChange = (fieldName) => (text) => {
    setError('');

    const value = text.target.value;
    setUserData((prev) => {
      return {
        ...prev,
        [fieldName]: value,
      };
    });
  };

  const handleAddUser = async () => {
    if (
      userData.name.trim().length === 0 ||
      userData.username.trim().length === 0 ||
      userData.email.trim().length === 0 ||
      userData.password.trim().length === 0 ||
      userData.passwordConfirm.trim().length === 0
    ) {
      setError('All fields are required');
      return;
    }

    if (userData.password !== userData.passwordConfirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);

    const response = await createUser({ data: userData, token });
    console.log(response);

    if (response.status === 'fail') {
      setError(response.message);
    }

    if (response.status === 'success') {
      dispatch(toggleModel());
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Typography color="primary.main" variant="h3">
        Add user
      </Typography>
      <MyInput
        text="Name"
        props={{
          value: userData.name,
          onChange: handleAddUserUpChange('name'),
        }}
      />
      <MyInput
        text="Email"
        props={{
          value: userData.email,
          onChange: handleAddUserUpChange('email'),
        }}
      />
      <MyInput
        text="Username"
        props={{
          value: userData.username,
          onChange: handleAddUserUpChange('username'),
        }}
      />
      <MyInput
        text="Password"
        props={{
          value: userData.password,
          onChange: handleAddUserUpChange('password'),
        }}
      />
      <MyInput
        text="passwordConfirm"
        props={{
          value: userData.passwordConfirm,
          onChange: handleAddUserUpChange('passwordConfirm'),
        }}
      />
      <FormControl fullWidth sx={{ mb: 2, mt: 2 }} variant="standard">
        <InputLabel id="demo-simple-select-label">User Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={10}>User</MenuItem>
          <MenuItem value={20}>Admin</MenuItem>
        </Select>
      </FormControl>
      {error && (
        <Typography sx={{ color: 'error.main', textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      <MyButton
        text={loading ? 'Loading...' : 'Add user'}
        disabled={loading}
        fullWidth
        onClick={handleAddUser}
      />
    </Box>
  );
}

export default AddUserForm;
