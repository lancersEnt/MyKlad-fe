/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/function-component-definition */
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { gql, useSubscription } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { RootState } from '../app/store';

interface PropType {
  component: React.FC;
}

const NOTIFICATION_SUBSCRIPTION = gql`
  subscription Subscription($userId: String) {
    notificationCreated(userId: $userId) {
      notification {
        id
        seen
        body
        targetUserId
      }
    }
  }
`;

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: notificationData } = useSubscription(
    NOTIFICATION_SUBSCRIPTION,
    {
      variables: { userId: user.id },
    }
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (notificationData?.notificationCreated?.notification) {
      enqueueSnackbar(notificationData.notificationCreated.notification.body, {
        key: notificationData.notificationCreated.notification.title,
        variant: 'success',
        anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
        SnackbarProps: {
          onClick: () => {
            closeSnackbar(
              notificationData.notificationCreated.notification.title
            );
          },
          style: {},
        },
        hideIconVariant: true,
        autoHideDuration: 5000,
      });
    }
  }, [notificationData, enqueueSnackbar, closeSnackbar]);

  if (isAuthenticated) return <Component />;
  return <Navigate to="/signin" state={{ from: location }} />;
};

export default PrivateRoute;
