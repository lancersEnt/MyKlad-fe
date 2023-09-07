/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Avatar,
  Box,
  capitalize,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import {
  gql,
  useMutation,
  useLazyQuery,
  useSubscription,
} from '@apollo/client';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import LikeIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareIcon from '@mui/icons-material/ShareOutlined';
import EmojiIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import SendRounded from '@mui/icons-material/SendRounded';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import ReactPlayer from 'react-player';
import Linkify from 'linkify-react';
import CustomTextField from '../../common/inputs/CustomTextField';
import { dateToNormalFormat } from '../../../utils/dateUtils';

// Interfaces
import Post from '../../../utils/Interfaces/Post.Interface';
import Comment from '../../../utils/Interfaces/Comment.interface';
import { RootState } from '../../../app/store';
import UserList from '../../common/UserList';
import {
  COMMENT_LIKE_SUBSCRIPTION,
  COMMENT_SUBSCRIPTION,
  COMMENT_UNLIKE_SUBSCRIPTION,
  POST_LIKE_SUBSCRIPTION,
  POST_UNLIKE_SUBSCRIPTION,
} from '../../../utils/GraphQL/Subscriptions';
import { POST } from '../../../utils/GraphQL/Queries';
import {
  ADD_COMMENT,
  LIKE_COMMENT,
  LIKE_POST,
  UNLIKE_COMMENT,
  UNLIKE_POST,
} from '../../../utils/GraphQL/Mutations';
import Share from '../../modals/Share';

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

interface PublicationProps {
  post: Post;
}

function Publication({ post }: PublicationProps) {
  const location = useLocation();

  const user = useSelector((state: RootState) => state.auth.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openEmojiMenu = Boolean(anchorEl);

  const commentsRef = useRef<HTMLDivElement>(null);
  const [comments, setComments] = useState(post.comments);
  const [commentsToShow, setCommentsToShow] = useState(3);

  const handleLoadMore = () => {
    // Increase the number of comments to show by 5 when "Load More" button is clicked
    setCommentsToShow((prev) =>
      prev + 5 > comments.length ? comments.length : prev + 5
    );
  };

  const [commentsF, setCommentsF] = useState(false);
  const [likers, setLikers] = useState(post.likers);
  const [likersIds, setLikersIds] = useState(post.likersIds);
  const [likersF, setLikersF] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  const [sharePostModal, setSharePostModal] = useState(false);

  const [postToShareId, setPostToShareId] = useState('');

  const handleCloseShareModal = () => {
    setSharePostModal(false);
  };

  const handleOpenShareModal = (postId: string) => {
    setPostToShareId(postId);
    setSharePostModal(true);
  };

  const [userListIsOpen, setUserListIsOpen] = useState(false);
  const [usersList, setUsersList]: any[] = useState([]);
  const [UserListTitle, setUserListTitle] = useState('');

  const { data: subData } = useSubscription(COMMENT_SUBSCRIPTION, {
    variables: { postId: post.id },
  });

  const { data: commentLikeSubData } = useSubscription(
    COMMENT_LIKE_SUBSCRIPTION,
    {
      variables: { postId: post.id },
    }
  );

  const { data: commentUnlikeSubData } = useSubscription(
    COMMENT_UNLIKE_SUBSCRIPTION,
    {
      variables: { postId: post.id },
      onComplete() {},
    }
  );

  const { data: likeSubData } = useSubscription(POST_LIKE_SUBSCRIPTION);
  const { data: unlikeSubData } = useSubscription(POST_UNLIKE_SUBSCRIPTION);

  const [fetchPost, { data, refetch: refetchPost }] = useLazyQuery(POST, {
    variables: { postId: post.id },
  });

  const [createComment] = useMutation(ADD_COMMENT, {
    onCompleted() {
      setCommentContent('');
      if (commentsRef.current) {
        commentsRef.current.scrollIntoView({
          behavior: 'smooth', // You can also use 'auto' or 'instant'
          block: 'start', // 'start', 'center', 'end', or 'nearest'
        });
      }
    },
  });

  const [likePost] = useMutation(LIKE_POST);
  const [likeComment] = useMutation(LIKE_COMMENT);
  const [unlikePost] = useMutation(UNLIKE_POST);
  const [unlikeComment] = useMutation(UNLIKE_COMMENT);

  const handleCreateComment = async () => {
    if (commentContent.length > 0)
      await createComment({
        variables: {
          createCommentInput: {
            content: commentContent,
            postId: post.id,
            postOwnerId: post.authorId,
            postSubscribers: JSON.stringify(post.subscribers),
          },
        },
      });
  };

  const handleEmoji = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseEmojiMenu = () => {
    setAnchorEl(null);
  };

  const addEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
    setCommentContent(`${commentContent}${emojiData.emoji} `);
  };

  useEffect(() => {
    if (
      (subData?.commentCreated?.newComment &&
        subData?.commentCreated?.newComment.postId === post.id) ||
      (commentLikeSubData?.commentLiked?.comment &&
        commentLikeSubData?.commentLiked?.comment.postId === post.id) ||
      (commentUnlikeSubData?.commentUnliked?.comment &&
        commentUnlikeSubData?.commentUnliked?.comment.postId === post.id) ||
      (likeSubData?.postLiked?.post &&
        likeSubData?.postLiked?.post.id === post.id) ||
      (unlikeSubData?.postUnliked?.post &&
        unlikeSubData?.postUnliked?.post.id === post.id)
    ) {
      if (commentsF || likersF) {
        refetchPost();
      } else
        fetchPost({
          onCompleted(res) {
            setLikers(res.post.likers);
            setLikersIds(res.post.likersIds);
            setComments(res.post.comments);
            setLikersF(true);
            setCommentsF(true);
          },
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // postComments,
    subData,
    commentLikeSubData,
    commentUnlikeSubData,
    likeSubData,
    unlikeSubData,
    post.id,
  ]);

  return (
    <CustomCard sx={{ mb: 5, position: 'relative' }}>
      <Linkify>
        <Box sx={{ color: 'grey', position: 'absolute', right: 0, top: 10 }}>
          <Stack direction="row" spacing={0}>
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
                  src={post.user.profilePictureUrl}
                />
              </IconButton>
              <Stack justifyContent="center" pr={2}>
                <Typography fontWeight={700} textTransform="capitalize">
                  <Link
                    preventScrollReset
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={
                      post.user.permissions.includes('user')
                        ? `/klader/${post.user.username}`
                        : `/page/${post.user.username}`
                    }
                  >
                    {`${post.user.firstname} ${post.user.lastname}`}
                  </Link>
                </Typography>
                <Typography fontSize={12} textTransform="unset">
                  <Link
                    preventScrollReset
                    style={{ textDecoration: 'underline', color: 'gray' }}
                    to={`/publication/${post.id}`}
                  >{`${dateToNormalFormat(post.createdAt)}`}</Link>
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ px: 4 }}>
          <Typography>{post.content}</Typography>
        </Box>
        {/* <ImageList cols={3} variant="woven" sx={{ height: '500px' }}>
          <ImageListItem>
            <img src={post.imageUrl} loading="lazy" alt="" />
          </ImageListItem>
          <ImageListItem>
            <img src={post.imageUrl} loading="lazy" alt="" />
          </ImageListItem>
          <ImageListItem>
            <img src={post.imageUrl} loading="lazy" alt="" />
          </ImageListItem>
        </ImageList> */}
        {post.imageUrl && (
          <CardMedia
            component="img"
            alt="alt"
            image={post.imageUrl}
            sx={{ maxHeight: '450px' }}
          />
        )}
        {post.videoUrl && (
          <ReactPlayer
            width="100%"
            light={!!post.videoUrl.match('youtube')}
            id={`${post.videoUrl.replace(
              '/raw/',
              '/image/'
            )}?input=video&f=webp&f2=jpeg`}
            controls
            url={post.videoUrl}
          />
        )}
        {post.type === 'shared-post' && (
          <Box sx={{ px: 2, py: 2 }}>
            <Box
              sx={{
                border: '1pt solid #d0d0d0',
                borderRadius: 3,
              }}
            >
              <Box
                sx={{ color: 'grey', position: 'absolute', right: 0, top: 10 }}
              >
                <Stack direction="row" spacing={0}>
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
                        src={post.post.user.profilePictureUrl}
                      />
                    </IconButton>
                    <Stack justifyContent="center" pr={2}>
                      <Typography fontWeight={700} textTransform="capitalize">
                        <Link
                          preventScrollReset
                          style={{ textDecoration: 'none', color: 'black' }}
                          to={
                            post.user.permissions.includes('user')
                              ? `/klader/${post.post.user.username}`
                              : `/page/${post.post.user.username}`
                          }
                        >
                          {`${post.post.user.firstname} ${post.post.user.lastname}`}
                        </Link>
                      </Typography>
                      <Typography fontSize={12} textTransform="unset">
                        <Link
                          preventScrollReset
                          style={{ textDecoration: 'underline', color: 'gray' }}
                          to={`/publication/${post.post.id}`}
                        >{`${dateToNormalFormat(post.post.createdAt)}`}</Link>
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
              <Box sx={{ px: 4 }}>
                <Typography>{post.post.content}</Typography>
              </Box>
              {post.post.imageUrl && (
                <CardMedia
                  component="img"
                  alt="alt"
                  image={post.post.imageUrl}
                  sx={{ maxHeight: '450px' }}
                />
              )}
              {post.post.videoUrl && (
                <ReactPlayer
                  width="100%"
                  light={!!post.post.videoUrl.match('youtube')}
                  id={`${post.post.videoUrl.replace(
                    '/raw/',
                    '/image/'
                  )}?input=video&f=webp&f2=jpeg`}
                  controls
                  url={post.post.videoUrl}
                />
              )}
              <Divider sx={{ my: 1 }} />
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
                              color: post.post.likersIds.includes(user.id)
                                ? '#305CE9'
                                : 'grey',
                            }}
                          />
                          <Typography
                            lineHeight={2}
                            fontWeight={400}
                            color="grey"
                            mx=".2rem"
                          >
                            {post.post.likersIds.length}
                          </Typography>
                          <Typography
                            lineHeight={2}
                            fontWeight={400}
                            color="grey"
                            display={{
                              xs: 'none',
                              sm: 'none',
                              lg: 'inline-block',
                            }}
                          >
                            J&apos;aime
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <CommentIcon
                            sx={{
                              color: 'grey',
                              my: 'auto',
                            }}
                          />
                          <Typography
                            lineHeight={2}
                            fontWeight={400}
                            color="grey"
                            mx=".2rem"
                          >
                            {post.post.comments.length}
                          </Typography>
                          <Typography
                            lineHeight={2}
                            fontWeight={400}
                            color="grey"
                            display={{
                              xs: 'none',
                              sm: 'none',
                              lg: 'inline-block',
                            }}
                          >
                            Commentaire
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <ShareIcon
                            sx={{
                              color: 'grey',
                              my: 'auto',
                            }}
                          />
                          <Typography
                            lineHeight={2}
                            fontWeight={400}
                            color="grey"
                            mx=".2rem"
                          >
                            {post.post.shares}
                          </Typography>
                          <Typography
                            lineHeight={2}
                            fontWeight={400}
                            color="grey"
                            display={{
                              xs: 'none',
                              sm: 'none',
                              lg: 'inline-block',
                            }}
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
              </CardContent>
            </Box>
          </Box>
        )}
        {post.type === 'shared-klad' && (
          <Box sx={{ px: 2, py: 2 }}>
            <Stack
              spacing={2}
              direction="row"
              sx={{
                display: 'flex',
                // p: 1,
                border: '1pt solid #d0d0d0',
                borderRadius: 3,
              }}
            >
              <Stack spacing={1} sx={{ width: '100%' }}>
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: '#F1F1F1',
                    borderRadius: 3,
                    p: 2,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      lg={3}
                      sx={{ position: 'relative' }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: '100%',
                          height: '100%',
                          maxHeight: '125px',
                          borderRadius: 2,
                        }}
                        image={post.klad.pictureUrl}
                        alt={post.klad.name}
                      />
                      <Avatar
                        sx={{
                          width: '35px',
                          height: '35px',
                          position: 'absolute',
                          left: 20,
                          top: 20,
                        }}
                        alt="Avatar"
                        src={post.klad.owner.profilePictureUrl}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                      <Box>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/klad/${post.klad.id}`}
                        >
                          <Typography
                            component="h3"
                            variant="h6"
                            fontSize={16}
                            color="text.primary"
                          >
                            {capitalize(`${post.klad.name}`)}
                          </Typography>
                        </Link>
                        <Typography
                          variant="caption"
                          component="p"
                          style={{
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {post.klad.description}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} lg={3}>
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'white',
                          borderRadius: 3,
                          display: 'flex',
                          p: 1,
                        }}
                      >
                        <Stack spacing={2} sx={{ my: 'auto', width: '100%' }}>
                          <Typography
                            variant="h4"
                            fontWeight={500}
                            fontSize={14}
                            textAlign="center"
                          >
                            Somme demandée
                          </Typography>
                          <Box px={3}>
                            <Typography
                              variant="h4"
                              color="primary"
                              fontSize={14}
                              textAlign="center"
                              sx={{
                                p: 1,
                                backgroundColor: '#E7F0F1',
                                borderRadius: 2,
                              }}
                            >
                              {post.klad.budgetNeeded} $
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Stack>
          </Box>
        )}
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
                ref={commentsRef}
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
                        color: likersIds.includes(user.id) ? '#305CE9' : 'grey',
                      }}
                      onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        likersIds.includes(user.id)
                          ? unlikePost({ variables: { postId: post.id } })
                          : likePost({ variables: { postId: post.id } });
                      }}
                    />
                    <Typography
                      lineHeight={2}
                      fontWeight={400}
                      color="grey"
                      mx=".2rem"
                      sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                      onClick={() => {
                        setUserListTitle('Kladeurs réagis');
                        setUsersList(likers);
                        if (likers.length > 0) setUserListIsOpen(true);
                      }}
                    >
                      {likers.length}
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
                      {comments.length}
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
                  {!(
                    post.type === 'shared-post' || post.type === 'shared-klad'
                  ) && (
                    <Box display="flex">
                      <ShareIcon
                        sx={{ color: 'grey', my: 'auto', cursor: 'pointer' }}
                        onClick={() => handleOpenShareModal(post.id)}
                      />
                      <Typography
                        lineHeight={2}
                        fontWeight={400}
                        color="grey"
                        mx=".2rem"
                      >
                        {post.shares}
                      </Typography>
                      <Typography
                        lineHeight={2}
                        fontWeight={400}
                        color="grey"
                        display={{
                          xs: 'none',
                          sm: 'none',
                          lg: 'inline-block',
                        }}
                      >
                        Partage
                      </Typography>
                    </Box>
                  )}
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

          {comments.length > 0 && commentsToShow > 0 && (
            <Divider sx={{ my: 2 }} />
          )}
          <Box mx={2}>
            {comments
              .slice(0, commentsToShow)
              .map((comment: Comment, index) => (
                <Stack key={comment.id} sx={{ px: 1 }}>
                  <Stack
                    direction="row"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <IconButton sx={{ my: 'auto' }}>
                      <Avatar
                        alt="Avatar"
                        sx={{ width: 30, height: 30 }}
                        src={comment.user.profilePictureUrl}
                      />
                    </IconButton>
                    <Typography
                      fontWeight={500}
                      fontSize={14}
                      textTransform="capitalize"
                    >
                      <Link
                        preventScrollReset
                        style={{ textDecoration: 'none', color: 'black' }}
                        to={
                          comment.user.permissions.includes('user')
                            ? `/klader/${comment.user.username}`
                            : `/page/${comment.user.username}`
                        }
                      >{`${comment.user.firstname} ${comment.user.lastname}`}</Link>
                    </Typography>
                  </Stack>
                  <Typography sx={{ px: 3 }}>{comment.content}</Typography>
                  <Box display="flex" sx={{ px: 1 }}>
                    <LikeIcon
                      sx={{
                        my: 'auto',
                        cursor: 'pointer',
                        color: comment.likersIds.includes(user.id)
                          ? '#305CE9'
                          : 'grey',
                        width: '15px',
                      }}
                      onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        comment.likersIds.includes(user.id)
                          ? unlikeComment({
                              variables: { commentId: comment.id },
                            })
                          : likeComment({
                              variables: { commentId: comment.id },
                            });
                      }}
                    />
                    <Typography
                      lineHeight={2}
                      fontWeight={400}
                      fontSize={12}
                      color="grey"
                      mx=".2rem"
                    >
                      {comment.likersIds.length}
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
                  {index !== commentsToShow - 1 && <Divider sx={{ my: 1 }} />}
                </Stack>
              ))}
            {/* <Divider sx={{ my: 1 }} /> */}
          </Box>
          {commentsToShow < comments.length && (
            <>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="center" mx={2}>
                <Typography
                  sx={{ cursor: 'pointer' }}
                  onClick={handleLoadMore}
                  color="primary"
                >
                  {commentsToShow === 0
                    ? 'Afficher les commentaires'
                    : 'Afficher plus'}
                </Typography>
              </Box>
            </>
          )}
          <Divider sx={{ mb: 2, mt: 1 }} />
          <Box mx={2} sx={{ pl: 0 }}>
            <Stack
              direction="row"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <IconButton sx={{ my: 'auto' }}>
                <Avatar alt="Avatar" src={user.profilePictureUrl} />
              </IconButton>
              <CustomTextField
                sx={{
                  my: 'auto',
                  width: '100%',
                }}
                placeholder="Ecrivez un commentaire ... "
                multiline
                variant="filled"
                onChange={(e) => setCommentContent(e.target.value)}
                value={commentContent}
                InputProps={{
                  hiddenLabel: true,
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-controls={openEmojiMenu ? 'emoji-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openEmojiMenu ? 'true' : undefined}
                        onClick={handleEmoji}
                        edge="end"
                      >
                        <EmojiIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Menu
                id="emoji-menu"
                anchorEl={anchorEl}
                open={openEmojiMenu}
                onClose={handleCloseEmojiMenu}
                PaperProps={{
                  style: {
                    borderRadius: '.5rem',
                  },
                }}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                  style: {
                    padding: 0,
                  },
                }}
                sx={{ p: 0 }}
              >
                <EmojiPicker
                  emojiStyle={EmojiStyle.NATIVE}
                  onEmojiClick={addEmoji}
                  searchDisabled
                />
              </Menu>
              <IconButton
                sx={{ my: 'auto' }}
                onClick={() => handleCreateComment()}
              >
                <SendRounded />
              </IconButton>
            </Stack>
          </Box>
        </CardContent>
        <UserList
          users={usersList}
          title={UserListTitle}
          open={userListIsOpen}
          setOpen={setUserListIsOpen}
        />
      </Linkify>
      <Share
        open={sharePostModal}
        handleClose={handleCloseShareModal}
        postId={postToShareId}
      />
    </CustomCard>
  );
}

export default Publication;
