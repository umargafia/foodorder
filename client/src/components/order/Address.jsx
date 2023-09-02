import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import MyInput from '../global/MyInput';
import MyButton from '../global/MyButton';
import InfoItem from './InfoItem';
import {
  getAddress,
  updateAddress,
  deleteAddressFunction,
} from '../../store/api';

function Address() {
  const [isEdit, setEdit] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [addressData, setAddressData] = useState({
    id: '',
    country: '',
    state: '',
    localGov: '',
    street: '',
    zipCode: '',
  });

  const handleGetAddress = async () => {
    setLoading(true);
    try {
      const response = await getAddress({ token });

      const data = response.data[0];

      setAddressData({
        id: data._id,
        country: data.country || '',
        state: data.state || '',
        localGov: data.localGov || '',
        street: data.street || '',
        zipCode: data.zipCode || '',
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAddress();
  }, [isEdit]);

  const handleAddressChange = (fieldName) => (event) => {
    setError('');
    const { value } = event.target;
    setAddressData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleRemove = async () => {
    setLoading(true);
    setError('');
    try {
      await deleteAddressFunction({ token, addressId: addressData.id });
      setAddressData({
        id: '',
        country: '',
        state: '',
        localGov: '',
        street: '',
        zipCode: '',
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setError('');
    if (
      addressData.country.trim().length === 0 ||
      addressData.localGov.trim().length === 0 ||
      addressData.state.trim().length === 0 ||
      addressData.street.trim().length === 0 ||
      addressData.zipCode.trim().length === 0
    ) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    try {
      await updateAddress({ token, addressData });
      setEdit(false);
      setLoading(false);
    } catch (error) {
      setError('something went wrong');
      setLoading(false);
    }
  };
  return (
    <Grid container sx={{ background: 'white', p: 2 }}>
      {isEdit ? (
        <>
          <Typography>Shipping Address</Typography>
          <MyInput
            props={{
              value: addressData.country,
              onChange: handleAddressChange('country'),
            }}
            text="Country"
          />
          <MyInput
            props={{
              value: addressData.state,
              onChange: handleAddressChange('state'),
            }}
            text="State"
          />
          <MyInput
            props={{
              value: addressData.localGov,
              onChange: handleAddressChange('localGov'),
            }}
            text="Local Government"
          />
          <MyInput
            props={{
              value: addressData.street,
              onChange: handleAddressChange('street'),
            }}
            text="Street"
          />
          <MyInput
            props={{
              value: addressData.zipCode,
              onChange: handleAddressChange('zipCode'),
              type: 'number',
            }}
            text="Zip Code"
          />
          <Box sx={{ width: '100%' }}>
            {error && (
              <Typography sx={{ color: '#d32f2f', textAlign: 'center' }}>
                {error}
              </Typography>
            )}

            {loading ? (
              <Button variant="contained" disabled fullWidth>
                <CircularProgress sx={{ color: 'primary.main' }} size={20} />
              </Button>
            ) : (
              <Box sx={{ display: 'flex' }}>
                <MyButton
                  fullWidth
                  text={'save'}
                  onClick={handleSave}
                  sx={{ mr: 2 }}
                />
                {addressData.id && (
                  <Button
                    fullWidth
                    onClick={handleRemove}
                    color="error"
                    variant="contained"
                  >
                    Remove Address
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </>
      ) : (
        <Box>
          <Typography
            sx={{
              color: 'primary.main',
              fontSize: 20,
              mb: 1,
              fontWeight: 'bold',
            }}
          >
            Address
          </Typography>
          <InfoItem title="Zip Code" text={addressData.zipCode || 'N/A'} />
          <InfoItem title="Country" text={addressData.country || 'N/A'} />
          <InfoItem title="State" text={addressData.state || 'N/A'} />
          <InfoItem
            title="Local Government"
            text={addressData.localGov || 'N/A'}
          />
          <InfoItem title="Street" text={addressData.street || 'N/A'} />
          <MyButton text="Edit" onClick={() => setEdit(true)} />
        </Box>
      )}
    </Grid>
  );
}

export default Address;
