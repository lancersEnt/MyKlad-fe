import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

import { gql, useQuery } from '@apollo/client';
import Notification from '../utils/Interfaces/Notification.interface';
import NotificationEntry from '../components/notifications/Notification';

const GET_NOTIFICATIONS = gql`
  query Notification {
    userNotifications {
      id
      title
      body
      action
      createdBy
      targetUserId
      seen
      createdAt
      user {
        id
        username
        firstname
        lastname
        profilePictureUrl
      }
    }
  }
`;

function Notifications() {
  const {
    data: notifications,
    loading,
    error,
    refetch,
  } = useQuery(GET_NOTIFICATIONS);
  return (
    <Box pb={5}>
      <Grid
        container
        spacing={10}
        sx={{ pl: { xs: 0, sm: 0, md: '5rem' }, pt: '5rem' }}
      >
        <Grid item lg={3} display={{ xs: 'none', sm: 'none', lg: 'flex' }} />

        <Grid item xs={12} sm={12} lg={6}>
          <Typography variant="h6" component="h2" gutterBottom>
            Notifications
          </Typography>
          <Card sx={{ borderRadius: 2, mb: 5 }}>
            <CardContent>
              {loading && (
                <Typography>Chargement des notifications ... </Typography>
              )}
              {!loading && error && <Typography> {error.message} </Typography>}
              {!loading &&
                notifications &&
                notifications.userNotifications.map(
                  (notification: Notification, index: number) => (
                    <Box key={notification.id}>
                      <NotificationEntry notification={notification} />
                      {index + 1 !== notifications.userNotifications.length && (
                        <Divider />
                      )}
                    </Box>
                  )
                )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Notifications;
