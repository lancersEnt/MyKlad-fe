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
  dateOfBirth: string;
  city: string;
  phone: string;
  address: string;
  nationality: string;
  profilePictureUrl: string;
  followers: User[];
  following: User[];
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
    dateOfBirth: '',
    city: '',
    phone: '',
    address: '',
    nationality: '',
    profilePictureUrl: '',
    followers: [],
    following: [],
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
    updateFollowing: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = initialState.user;
      cookies.remove('isAuthenticated');
    },
  },
});

export const { login, logout, updateFollowing } = authSlice.actions;
export default authSlice.reducer;
