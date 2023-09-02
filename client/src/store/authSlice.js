import { createSlice } from '@reduxjs/toolkit';

const user = localStorage.getItem('user');

const initialState = {
  isAuthenticated: user ? true : false,
  token: user ? JSON.parse(user).token : '',
  user: user ? JSON.parse(user).data : null,
  noOfCarts: 0,
  model: false,
  carts: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.data;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = '';
    },
    setNoOfCarts: (state, action) => {
      state.noOfCarts = action.payload;
    },
    setCartsReducer: (state, action) => {
      state.carts = action.payload;
    },
    toggleModel: (state, action) => {
      state.model = !state.model;
    },
  },
});

export const {
  loginUser,
  logout,
  setError,
  saveFavorites,
  setNoOfCarts,
  setCartsReducer,
  toggleModel,
} = authSlice.actions;
export default authSlice.reducer;
