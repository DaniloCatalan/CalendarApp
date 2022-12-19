import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = 'no-authenticated';
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) =>{
      state.status = 'no-authenticated';
      state.errorMessage = undefined;
      state.user = {};
    }
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;
