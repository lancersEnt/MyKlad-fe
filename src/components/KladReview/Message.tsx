import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
  capitalize,
} from '@mui/material';
import { Message } from '../../utils/Interfaces/Message.interface';

interface MessageLeftProps {
  displayUser: boolean;
  message: Message;
}

export function MessageLeft({ displayUser, message }: MessageLeftProps) {
  return (
    <Box display="flex">
      <Stack spacing={2} direction="row" sx={{ display: 'flex' }}>
        {displayUser ? (
          <Avatar
            src={message.user.profilePictureUrl}
            sx={{
              width: 50,
              height: 50,
              border: '1px solid lightgrey',
            }}
          />
        ) : (
          <Box sx={{ width: 50 }} />
        )}
        <Stack sx={{ maxWidth: '70%' }}>
          {displayUser && (
            <Stack direction="row">
              <Typography
                component="h3"
                variant="h6"
                fontSize={16}
                lineHeight={3}
              >
                {capitalize(
                  `${message.user.firstname} ${message.user.lastname}`
                )}
              </Typography>
            </Stack>
          )}
          <Box
            sx={{
              position: 'relative',
              padding: '10px',
              backgroundColor: '#305CE9',
              // height: "50px",
              textAlign: 'left',
              border: '1px solid #97C6E3',
              borderRadius: '10px',
              '&:after': {
                content: "''",
                position: 'absolute',
                width: '0',
                height: '0',
                borderTop: '15px solid #305CE9',
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                top: '0',
                left: '-15px',
              },
              '&:before': {
                content: "''",
                position: 'absolute',
                width: '0',
                height: '0',
                borderTop: '17px solid #97C6E3',
                borderLeft: '16px solid transparent',
                borderRight: '16px solid transparent',
                top: '-1px',
                left: '-17px',
              },
            }}
          >
            <Typography color="white" component="span">
              {message.content}
            </Typography>
          </Box>
          {/* <Typography
            variant="caption"
            color="secondary"
            sx={{ mt: '0 !important', mr: 'auto !important' }}
          >
            {message.createdAt.slice(0, 16)}
          </Typography> */}
        </Stack>
      </Stack>
    </Box>
  );
}
interface MessageRightProps {
  message: Message;
}
export function MessageRight({ message }: MessageRightProps) {
  return (
    <Box>
      <Stack spacing={2} direction="row-reverse" sx={{ display: 'flex' }}>
        <Stack spacing={1} sx={{ maxWidth: '70%' }}>
          <Box
            sx={{
              position: 'relative',
              padding: '10px',
              backgroundColor: '#f8e896',
              textAlign: 'left',
              border: '1px solid #dfd087',
              borderRadius: '10px',
              '&:after': {
                content: "''",
                position: 'absolute',
                width: '0',
                height: '0',
                borderTop: '15px solid #f8e896',
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                top: '0',
                right: '-15px',
              },
              '&:before': {
                content: "''",
                position: 'absolute',
                width: '0',
                height: '0',
                borderTop: '17px solid #dfd087',
                borderLeft: '16px solid transparent',
                borderRight: '16px solid transparent',
                top: '-1px',
                right: '-17px',
              },
            }}
          >
            <Typography component="span" display="flex">
              {message.content}
            </Typography>
          </Box>
          {/* <Typography
            variant="caption"
            color="secondary"
            sx={{ mt: '0 !important', ml: 'auto !important' }}
          >
            {message.createdAt.slice(0, 16)}
          </Typography> */}
        </Stack>
      </Stack>
    </Box>
  );
}
