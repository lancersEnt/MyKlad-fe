/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface AuthState {
  email: string | null;
  access_token: string | null;
}

const initialState: AuthState = {
  email: null,
  access_token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ email: string; access_token: string }>
    ) => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: action.payload.email,
          access_token: action.payload.access_token,
        })
      );
      state.email = action.payload.email;
      state.access_token = action.payload.access_token;
    },
    logout: (state) => {
      localStorage.clear();
      state.email = null;
      state.access_token = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
