/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

// Layouts
import { useDispatch } from 'react-redux';
import LoggedInLayout from './layouts/LoggedInLayout';
import SettingsLayout from './layouts/SettingsLayout';
import PrivateRoute from './route protection/ProtectedRoutes';
import UnloggedRoutes from './route protection/UnLoggedRoutes';
import { login, logout } from './features/auth/authSlice';
import { UseIsAuth } from './hooks/auth/UseIsAuth';

// Lazy Loading Pages
const SignIn = React.lazy(() => import('./pages/SignIn'));
const Forgot = React.lazy(() => import('./pages/Forgot'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const AccountActivation = React.lazy(() => import('./pages/AccountActivation'));
const NotFound = React.lazy(() => import('./pages/Errors/NotFound'));

const Home = React.lazy(() => import('./pages/Home'));
const SearchResults = React.lazy(() => import('./pages/SearchResults'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Profile = React.lazy(() => import('./pages/Profile'));
const ExpertHub = React.lazy(() => import('./pages/ExpertHub'));
const KladReview = React.lazy(() => import('./pages/KladReview'));
const Page = React.lazy(() => import('./pages/Page'));
const Kladers = React.lazy(() => import('./pages/Kladers'));
const Klads = React.lazy(() => import('./pages/Klads'));
const MyKlads = React.lazy(() => import('./pages/MyKlads'));
const Klad = React.lazy(() => import('./pages/Klad'));
const Notifications = React.lazy(() => import('./pages/Notifications'));
const PublicationView = React.lazy(() => import('./pages/PublicationView'));

const Settings = React.lazy(() => import('./pages/Settings'));
const DraftKlad = React.lazy(() => import('./pages/DraftKlad'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#305CE9',
    },
    secondary: {
      main: '#727881',
    },
    success: {
      main: '#66bb6a',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ffa726',
    },
  },
  typography: {
    fontFamily: 'Ubuntu',
  },
});

function App() {
  const dispatch = useDispatch();
  const { data, loading } = UseIsAuth();

  // Use the `useEffect` hook to dispatch the `login` action when data is available and not loading
  useEffect(() => {
    if (!loading && data && data.me) {
      if (data.me.isActive === true) dispatch(login(data.me));
      else dispatch(logout());
    }
    if (!loading && !data?.me) {
      dispatch(logout());
    }
  }, [data, loading]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<PrivateRoute component={LoggedInLayout} />}>
          <Route
            path="/admin"
            element={
              <React.Suspense>
                <Admin />
              </React.Suspense>
            }
          />
          <Route
            path="/"
            element={
              <React.Suspense>
                <Home />
              </React.Suspense>
            }
          />
          <Route
            path="/search"
            element={
              <React.Suspense>
                <SearchResults />
              </React.Suspense>
            }
          />
          <Route
            path="/notifications"
            element={
              <React.Suspense>
                <Notifications />
              </React.Suspense>
            }
          />
          <Route
            path="/kladers"
            element={
              <React.Suspense>
                <Kladers />
              </React.Suspense>
            }
          />
          <Route
            path="/klad/:kladId"
            element={
              <React.Suspense>
                <Klad />
              </React.Suspense>
            }
          />
          <Route
            path="/expert-hub"
            element={
              <React.Suspense>
                <ExpertHub />
              </React.Suspense>
            }
          />
          <Route
            path="/expert-hub/review/:kladId"
            element={
              <React.Suspense>
                <KladReview />
              </React.Suspense>
            }
          />
          <Route
            path="/klader/:username"
            element={
              <React.Suspense>
                <Profile />
              </React.Suspense>
            }
          />
          <Route
            path="/page/:username"
            element={
              <React.Suspense>
                <Page />
              </React.Suspense>
            }
          />
          <Route
            path="/klads"
            element={
              <React.Suspense>
                <Klads />
              </React.Suspense>
            }
          />
          <Route
            path="/myklads"
            element={
              <React.Suspense>
                <MyKlads />
              </React.Suspense>
            }
          />
          <Route
            path="/publication/:postId"
            element={
              <React.Suspense>
                <PublicationView />
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
          <Route
            path="/draft-klad/:kladId"
            element={
              <React.Suspense>
                <DraftKlad />
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
          path="/account-activation/:token"
          element={
            <React.Suspense>
              <UnloggedRoutes component={AccountActivation} />
            </React.Suspense>
          }
        />
        <Route
          path="/forgot"
          element={
            <React.Suspense>
              <UnloggedRoutes component={Forgot} />
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
