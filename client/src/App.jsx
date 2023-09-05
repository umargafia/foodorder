import { Box, useTheme } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomePage from './screens/HomePage';
import Footer from './components/global/Footer';
import ItemPage from './screens/ItemPage';
import AuthPage from './screens/AuthPage';
import OrderPage from './screens/OrderPage';
import ReceptPage from './screens/ReciptPage';
import AdminHome from './screens/admin/AdminHome';

function App() {
  const user = useSelector((state) => state.auth.user);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/item/:id',
      element: <ItemPage />,
    },
    {
      path: '/auth',
      element: user ? <HomePage /> : <AuthPage />,
    },
    {
      path: '/order',
      element: <OrderPage />,
    },
    {
      path: '/recept',
      element: <ReceptPage />,
    },
  ]);

  const isNotAuth = createBrowserRouter([
    {
      path: '*',
      element: <AuthPage />,
    },
  ]);

  const adminRoutes = createBrowserRouter([
    {
      path: '/',
      element: <AdminHome />,
    },
  ]);

  const theme = useTheme();
  console.log(user);
  return (
    <Box
      sx={{ backgroundColor: theme.palette.primary.white, minHeight: '100vh' }}
    >
      <Box sx={{ backgroundColor: theme.palette.primary.white, m: 0, px: 15 }}>
        <RouterProvider
          router={
            user ? (user?.role === 'admin' ? adminRoutes : router) : isNotAuth
          }
        />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
