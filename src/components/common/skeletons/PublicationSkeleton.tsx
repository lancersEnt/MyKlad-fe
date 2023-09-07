import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  Skeleton,
  Stack,
  styled,
  Typography,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import LikeIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareIcon from '@mui/icons-material/ShareOutlined';
import SaveIcon from '@mui/icons-material/BookmarkBorderOutlined';
import EmojiIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import SendRounded from '@mui/icons-material/SendRounded';
import CustomTextField from '../inputs/CustomTextField';

const CustomCard = styled(Card)(({ theme }) => ({
  border: 'none',
  overflow: 'hidden',
  borderRadius: 10,
  transition: theme.transitions.create(['border-color', 'box-shadow']),
  $focused: {
    backgroundColor: '#fff',
    boxShadow: `fade${(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    borderColor: theme.palette.primary.main,
  },
})) as typeof Card;

function PublicationSkeleton() {
  return (
    <CustomCard sx={{ mb: 5, position: 'relative' }}>
      <Box sx={{ color: 'grey', position: 'absolute', right: 0, top: 10 }}>
        <Stack direction="row" spacing={0}>
          <MoreVertIcon fontSize="large" />
        </Stack>
      </Box>
      <Box p={2}>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1}>
            <IconButton>
              <Skeleton
                animation="wave"
                variant="circular"
                width={50}
                height={50}
              />
            </IconButton>
            <Stack justifyContent="center" pr={2}>
              <Skeleton
                variant="text"
                sx={{ fontSize: '1rem', width: '12ch' }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ fontSize: 12, width: '20ch' }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ px: 4 }}>
        <Skeleton animation="wave" variant="text" sx={{ width: '30ch' }} />
        <Skeleton animation="wave" variant="text" sx={{ width: '20ch' }} />
      </Box>
      <CardContent sx={{ px: 0 }}>
        <Box mx={2}>
          <Box
            sx={{
              border: { md: '1px solid lightgrey' },
              borderRadius: { md: 3 },
              px: { md: 2 },
              py: { md: 1 },
              overflow: 'hidden',
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: 'space-between' }}
            >
              <Stack direction="row" spacing={2}>
                <Box display="flex">
                  <LikeIcon
                    sx={{
                      my: 'auto',
                      cursor: 'pointer',
                      color: 'grey',
                    }}
                  />
                  <Typography
                    lineHeight={2}
                    fontWeight={400}
                    color="grey"
                    mx=".2rem"
                    sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{ width: '1ch' }}
                    />
                  </Typography>
                  <Typography
                    lineHeight={2}
                    fontWeight={400}
                    color="grey"
                    display={{ xs: 'none', sm: 'none', lg: 'inline-block' }}
                  >
                    J&apos;aime
                  </Typography>
                </Box>
                <Box display="flex">
                  <CommentIcon
                    sx={{ color: 'grey', my: 'auto', cursor: 'pointer' }}
                  />
                  <Typography
                    lineHeight={2}
                    fontWeight={400}
                    color="grey"
                    mx=".2rem"
                  >
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{ width: '1ch' }}
                    />
                  </Typography>
                  <Typography
                    lineHeight={2}
                    fontWeight={400}
                    color="grey"
                    display={{ xs: 'none', sm: 'none', lg: 'inline-block' }}
                  >
                    Commentaire
                  </Typography>
                </Box>
                <Box display="flex">
                  <ShareIcon
                    sx={{ color: 'grey', my: 'auto', cursor: 'pointer' }}
                  />
                  <Typography
                    lineHeight={2}
                    fontWeight={400}
                    color="grey"
                    mx=".2rem"
                  >
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{ width: '1ch' }}
                    />
                  </Typography>
                  <Typography
                    lineHeight={2}
                    fontWeight={400}
                    color="grey"
                    display={{ xs: 'none', sm: 'none', lg: 'inline-block' }}
                  >
                    Partage
                  </Typography>
                </Box>
              </Stack>
              {/* <Stack direction="row" spacing={2}>
                <Box display="flex">
                  <SaveIcon
                    sx={{ color: 'grey', my: 'auto', cursor: 'pointer' }}
                  />
                  <Typography
                    lineHeight={2}
                    fontWeight={400}
                    color="grey"
                    display={{ xs: 'none', sm: 'none', lg: 'inline-block' }}
                    noWrap
                  >
                    Enregistrer
                  </Typography>
                </Box>
              </Stack> */}
            </Stack>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />{' '}
        <Box mx={2}>
          <Stack sx={{ px: 1 }}>
            <Stack
              direction="row"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <IconButton sx={{ my: 'auto' }}>
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={30}
                  height={30}
                />
              </IconButton>
              <Typography
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                <Skeleton variant="text" width="12ch" animation="wave" />
              </Typography>
            </Stack>
            <Typography sx={{ px: 3 }}>
              <Skeleton variant="text" width="22ch" animation="wave" />
            </Typography>
            <Box display="flex" sx={{ px: 1 }}>
              <LikeIcon
                sx={{
                  my: 'auto',
                  cursor: 'pointer',
                  color: 'grey',
                  width: '15px',
                }}
              />
              <Typography
                lineHeight={2}
                fontWeight={400}
                fontSize={12}
                color="grey"
                mx=".2rem"
              >
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ width: '1ch' }}
                />
              </Typography>
              <Typography
                lineHeight={2}
                fontWeight={400}
                fontSize={12}
                color="grey"
                display={{ xs: 'none', sm: 'none', lg: 'inline-block' }}
              >
                J&apos;aime
              </Typography>
            </Box>
          </Stack>
          <Divider sx={{ my: 1 }} />
        </Box>
        <Box mx={2}>
          <Stack sx={{ px: 1 }}>
            <Stack
              direction="row"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <IconButton sx={{ my: 'auto' }}>
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={30}
                  height={30}
                />
              </IconButton>
              <Typography
                fontWeight={500}
                fontSize={14}
                textTransform="capitalize"
              >
                <Skeleton variant="text" width="12ch" animation="wave" />
              </Typography>
            </Stack>
            <Typography sx={{ px: 3 }}>
              <Skeleton variant="text" width="22ch" animation="wave" />
            </Typography>
            <Box display="flex" sx={{ px: 1 }}>
              <LikeIcon
                sx={{
                  my: 'auto',
                  cursor: 'pointer',
                  color: 'grey',
                  width: '15px',
                }}
              />
              <Typography
                lineHeight={2}
                fontWeight={400}
                fontSize={12}
                color="grey"
                mx=".2rem"
              >
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ width: '1ch' }}
                />
              </Typography>
              <Typography
                lineHeight={2}
                fontWeight={400}
                fontSize={12}
                color="grey"
                display={{ xs: 'none', sm: 'none', lg: 'inline-block' }}
              >
                J&apos;aime
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box mx={2} sx={{ pl: 0 }}>
          <Stack direction="row" sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ my: 'auto' }}>
              <Skeleton variant="circular" width={40} height={40} />
            </IconButton>
            <CustomTextField
              sx={{
                my: 'auto',
                width: '100%',
              }}
              placeholder="Ecrivez un commentaire ... "
              multiline
              variant="filled"
              InputProps={{
                hiddenLabel: true,
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-haspopup="true" edge="end">
                      <EmojiIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <IconButton sx={{ my: 'auto' }}>
              <SendRounded />
            </IconButton>
          </Stack>
        </Box>
      </CardContent>
    </CustomCard>
  );
}
export default PublicationSkeleton;
