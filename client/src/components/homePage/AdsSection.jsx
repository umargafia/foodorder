import Grid from '@mui/material/Unstable_Grid2/Grid2';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined';
import PaymentsIcon from '@mui/icons-material/Payments';

import MyCard from '../global/Mycard';
import AdsItem from './AdsItem';
export default function AdsSection() {
  const adsList = [
    {
      icon: <LocalShippingIcon color="primary" />,
      title: 'Fast Delivery',
      text: 'Start from iPhone x',
    },
    {
      icon: <AlarmOnOutlinedIcon color="primary" />,
      title: '365 Days',
      text: ' Return & Exchange',
    },
    {
      icon: <PaymentsIcon color="primary" />,
      title: 'Payments',
      text: 'Secure Payment',
    },
  ];

  return (
    <MyCard>
      <Grid
        container
        sm={12}
        sx={{ px: 10, display: 'flex', justifyContent: 'space-between' }}
      >
        {adsList.map((item) => (
          <AdsItem item={item} key={item.title} />
        ))}
      </Grid>
    </MyCard>
  );
}
