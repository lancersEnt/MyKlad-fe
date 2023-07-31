/* eslint-disable import/no-extraneous-dependencies */
import { Avatar, Badge, Box, Stack, Typography } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import Notification from '../../utils/Interfaces/Notification.interface';

interface NotificationProps {
  notification: Notification;
}

const MARK_AS_SEEN = gql`
  mutation MarkAsSeen($markAsSeenId: String) {
    markAsSeen(id: $markAsSeenId) {
      id
    }
  }
`;

function NotificationEntry({ notification }: NotificationProps) {
  const [markAsSeen] = useMutation(MARK_AS_SEEN);
  const navigate = useNavigate();

  return (
    <Box
      py={2}
      my={1}
      sx={{
        backgroundColor: notification.seen ? 'white' : '#f0f0f0',
        borderRadius: 2,
        cursor: 'pointer',
        ':hover': {
          boxShadow: 1,
        },
      }}
      onClick={() => {
        markAsSeen({
          variables: { markAsSeenId: notification.id },
          onCompleted() {
            navigate(notification.action);
          },
        });
      }}
    >
      <Box p={1}>
        <Badge
          color="primary"
          variant="dot"
          invisible={notification.seen}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Stack spacing={2} direction="row">
            <Avatar
              src={notification.user.profilePictureUrl}
              alt="profile-pic"
            />
            <Stack>
              <Typography fontSize={12}>{`${notification.body}`}</Typography>
              <Typography fontSize={10} color="grey">
                <ReactTimeAgo date={new Date(notification.createdAt)} />
              </Typography>
            </Stack>
          </Stack>
        </Badge>
      </Box>
    </Box>
  );
}

export default NotificationEntry;
