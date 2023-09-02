import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import Form from '../components/form/Form';

function AuthPage() {
  return (
    <Grid
      sx={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          bgcolor: 'white',
          p: 3,
          minWidth: '40vw',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Form />
      </Box>
    </Grid>
  );
}

export default AuthPage;
