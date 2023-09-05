import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import image from '../../assets/header.jpg';
import MyCard from '../global/Mycard';
import './WelcomeSection.css';

export default function WelcomeSection() {
  const backgroundImageStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <Box
      sx={{
        mt: 10,
        p: 0,
        ...backgroundImageStyle, // Apply the background image style here
        position: 'relative', // Add relative positioning for animation
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darken the background
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      ></div>
      <MyCard
        sx={{
          backgroundColor: 'transparent', // Make the card background transparent
          position: 'relative', // Add relative positioning for animation
          zIndex: 1,
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" sx={{ color: '#fff' }} className="slide-in">
          Welcome to our Food Ordering System!
        </Typography>
        <Button
          sx={{ color: 'white', border: '2px solid white' }}
          variant="outlined"
          className="bottom-slide-in"
        >
          start now
        </Button>
        {/* Your card content goes here */}
      </MyCard>
    </Box>
  );
}
