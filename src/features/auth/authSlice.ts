/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User;
}

const initialState: AuthState = {
  isAuthenticated: cookies.get('isAuthenticated'),
  user: {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    username: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      cookies.set('isAuthenticated', 'true', { path: '/' });
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = initialState.user;
      cookies.remove('isAuthenticated');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
