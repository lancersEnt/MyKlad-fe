/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

// Layouts
import LoggedInLayout from './layouts/LoggedInLayout';
import SettingsLayout from './layouts/SettingsLayout';
import { useAppDispatch } from './app/hooks';
import { setUser } from './features/authSlice';
import PrivateRoute from './route protection/ProtectedRoutes';
import UnloggedRoutes from './route protection/UnLoggedRoutes';

// Lazy Loading Pages
const Home = React.lazy(() => import('./pages/Home'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const NotFound = React.lazy(() => import('./pages/Errors/NotFound'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Settings = React.lazy(() => import('./pages/Settings'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#305CE9',
    },
    secondary: {
      main: '#727881',
    },
  },
  typography: {
    fontFamily: 'Ubuntu',
  },
});

function App() {
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  dispatch(setUser(user));

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<PrivateRoute component={LoggedInLayout} />}>
          <Route
            path="/"
            element={
              <React.Suspense>
                <Home />
              </React.Suspense>
            }
          />
          <Route
            path="/klader/:id"
            element={
              <React.Suspense>
                <Profile />
              </React.Suspense>
            }
          />
        </Route>
        <Route element={<PrivateRoute component={SettingsLayout} />}>
          <Route
            path="/settings"
            element={
              <React.Suspense>
                <Settings />
              </React.Suspense>
            }
          />
        </Route>
        <Route
          path="/signup"
          element={
            <React.Suspense>
              <UnloggedRoutes component={SignUp} />
            </React.Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <React.Suspense>
              <UnloggedRoutes component={SignIn} />
            </React.Suspense>
          }
        />
        <Route
          path="/forgot"
          element={
            <React.Suspense>
              <UnloggedRoutes component={SignIn} />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

function MyKlad() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default MyKlad;
