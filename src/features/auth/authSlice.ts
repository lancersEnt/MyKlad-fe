/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { Klad } from '../../utils/Interfaces/Klad.interface';

const cookies = new Cookies();

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  balance: number;
  dateOfBirth: string;
  city: string;
  phone: string;
  address: string;
  nationality: string;
  profilePictureUrl: string;
  permissions: string[];
  followers: User[];
  following: User[];
  pages: User[];
  klads: Klad[];
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
    balance: 0,
    dateOfBirth: '',
    city: '',
    phone: '',
    address: '',
    nationality: '',
    profilePictureUrl: '',
    permissions: [],
    followers: [],
    following: [],
    pages: [],
    klads: [],
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
    updateBalance: (state, action: PayloadAction<number>) => {
      // Update the user's balance
      state.user.balance = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = initialState.user;
      cookies.remove('isAuthenticated');
    },
  },
});

export const { login, logout, updateFollowing, updateBalance } =
  authSlice.actions;
export default authSlice.reducer;
