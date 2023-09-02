import { Box } from '@mui/material';
import React from 'react';

import Carts from '../global/Carts';
import iphoneLists from '../../constants/IphoneLists';

function CardsSection() {
  return (
    <Box
      sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      id="items"
    >
      {iphoneLists.map((item) => (
        <Carts key={item.name} item={item} />
      ))}
    </Box>
  );
}

export default CardsSection;
