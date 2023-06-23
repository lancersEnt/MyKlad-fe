import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  IconButton,
  InputAdornment,
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
import CustomTextField from '../../common/inputs/CustomTextField';

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

function Publication() {
  return (
    <CustomCard sx={{ mb: 5, position: 'relative' }}>
      <Box sx={{ color: 'grey', position: 'absolute', right: 0, top: 10 }}>
        <Stack direction="row" spacing={0}>
          <Typography fontSize="14px" lineHeight="2.25rem">
            24 AVR
          </Typography>
          <MoreVertIcon fontSize="large" />
        </Stack>
      </Box>
      <Box p={2}>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1}>
            <IconButton>
              <Avatar
                sx={{ width: '50px', height: '50px' }}
                alt="Avatar"
                src=""
              />
            </IconButton>
            <Stack justifyContent="center" pr={2}>
              <Typography fontWeight={700}>
                Nom de cabinet d&apos;expertise 
              </Typography>
              <Typography fontSize={14} color="grey">
                0113Z - Culture de légume, de melons, de racines et de
                tubercules
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <CardMedia
        component="img"
        alt="alt"
        height="450px"
        image="https://images.unsplash.com/photo-1680034200882-698487d46a79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
      />
      <CardContent sx={{ px: 0 }}>
        <Container>
          {/* <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: 'space-between', px: 2 }}
          >
            <Typography lineHeight={2} fontWeight={400} color="grey">
              23 J&apos;aime
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography lineHeight={2} fontWeight={400} color="grey">
                8 Commentaires
              </Typography>
              <Typography lineHeight={2} fontWeight={400} color="grey">
                3 Partages
              </Typography>
            </Stack>
          </Stack> */}
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
                  <LikeIcon color="primary" sx={{ my: 'auto' }} />
                  <Typography
                    lineHeight={2}
                    fontWeight={400}
                    color="grey"
                    mx=".2rem"
                  >
                    {25}
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
                  <CommentIcon sx={{ color: 'grey', my: 'auto' }} />
                  <Typography
                    lineHeight={2}
                    fontWeight={400}
                    color="grey"
                    mx=".2rem"
                  >
                    {25}
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
                  <ShareIcon sx={{ color: 'grey', my: 'auto' }} />
                  <Typography
                    lineHeight={2}
                    fontWeight={400}
                    color="grey"
                    mx=".2rem"
                  >
                    {25}
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
              <Stack direction="row" spacing={2}>
                <Box display="flex">
                  <SaveIcon sx={{ color: 'grey', my: 'auto' }} />
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
              </Stack>
            </Stack>
          </Box>
        </Container>
        <Divider sx={{ my: 2 }} />
        <Container sx={{ pl: 0 }}>
          <Stack direction="row">
            <IconButton sx={{ my: 'auto' }}>
              <Avatar alt="Avatar" src="" />
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
                    <IconButton edge="end">
                      <EmojiIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Container>
      </CardContent>
    </CustomCard>
  );
}

export default Publication;
