import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

// Layouts
import LoggedInLayout from './layouts/LoggedInLayout';

// Lazy Loading Pages
const Home = React.lazy(() => import('./pages/Home'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const NotFound = React.lazy(() => import('./pages/Errors/NotFound'));
const Profile = React.lazy(() => import('./pages/Profile'));

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
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<LoggedInLayout />}>
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
        <Route
          path="/signup"
          element={
            <React.Suspense>
              <SignUp />
            </React.Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <React.Suspense>
              <SignIn />
            </React.Suspense>
          }
        />
        <Route
          path="/forgot"
          element={
            <React.Suspense>
              <SignIn />
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
