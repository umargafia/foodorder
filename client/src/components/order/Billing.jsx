import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import MyInput from '../global/MyInput';
import MyButton from '../global/MyButton';
import InfoItem from './InfoItem';
import { createCard, deleteCard, getCards } from '../../store/api';

function Billing() {
  const { token } = useSelector((state) => state.auth);
  const [isEdith, setEdith] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({
    id: '',
    cardHolder: '',
    cardNumber: '',
    cvv: '',
    expiration: '',
  });

  const handleGetCard = async () => {
    setLoading(true);
    try {
      const response = await getCards({ token });

      let data = response;

      if (data?.message) {
        setLoading(false);
        return;
      }

      data = response.data;
      setCardData({
        id: data.id,
        cardHolder: data.cardHolder,
        cardNumber: data.cardNumber,
        cvv: data.cvv,
        expiration: data.expiration,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetCard();
  }, [isEdith]);

  const handleCardChange = (fieldName) => (event) => {
    setError('');
    const { value } = event.target;
    setCardData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleRemove = async () => {
    setLoading(true);
    setError('');
    try {
      await deleteCard({ token, cardID: cardData.id });
      setCardData({
        id: '',
        cardHolder: '',
        cardNumber: '',
        cvv: '',
        expiration: '',
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setError('');
    if (
      cardData.cardHolder.trim().length === 0 ||
      cardData.cardNumber.trim().length === 0 ||
      cardData.cvv.trim().length === 0 ||
      cardData.expiration.trim().length === 0
    ) {
      console.log({ cardData });
      setError('All fields are required');
      return;
    }
    setLoading(true);

    try {
      await createCard({ token, data: cardData });
      setLoading(false);
      setEdith(false);
    } catch (error) {
      setError('something went wrong');
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ background: 'white', p: 2 }}>
      {isEdith ? (
        <>
          <Typography>Billing Information</Typography>
          <MyInput
            text="Full Name"
            props={{
              value: cardData.cardHolder,
              onChange: handleCardChange('cardHolder'),
            }}
          />
          <MyInput
            text="Card Number"
            type="number"
            props={{
              value: cardData.cardNumber,
              onChange: handleCardChange('cardNumber'),
            }}
          />
          <MyInput
            text="Expire Date  (mm/yyyy)"
            props={{
              value: cardData.expiration,
              onChange: handleCardChange('expiration'),
            }}
          />
          <MyInput
            text="Cvv"
            type="number"
            props={{
              value: cardData.cvv,
              onChange: handleCardChange('cvv'),
            }}
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
                {cardData.id && (
                  <Button
                    fullWidth
                    onClick={handleRemove}
                    color="error"
                    variant="contained"
                  >
                    Remove card
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </>
      ) : (
        <>
          <Box>
            <Typography
              sx={{
                color: 'primary.main',
                fontSize: 20,
                mb: 1,
                fontWeight: 'bold',
              }}
            >
              Billing Information
            </Typography>
            <InfoItem title="Full Name" text={cardData.cardHolder || 'N/A'} />
            <InfoItem title="Card Number" text={cardData.cardNumber || 'N/A'} />
            <InfoItem title="Expire Date" text={cardData.expiration || 'N/A'} />
            <InfoItem title="Cvv" text={cardData.cvv || 'N/A'} />
            <MyButton
              text="Edith Billing Information"
              onClick={() => setEdith(true)}
            />
          </Box>
        </>
      )}
    </Grid>
  );
}

export default Billing;
