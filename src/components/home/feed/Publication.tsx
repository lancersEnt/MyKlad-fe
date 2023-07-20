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
import SaveIcon from '@mui/icons-material/BookmarkBorderOutlined';
import EmojiIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import SendRounded from '@mui/icons-material/SendRounded';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomTextField from '../../common/inputs/CustomTextField';
import { dateToNormalFormat } from '../../../utils/dateUtils';

// Interfaces
import Post from '../../../utils/Interfaces/Post.Interface';
import Comment from '../../../utils/Interfaces/Comment.interface';
import { RootState } from '../../../app/store';

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

const ADD_COMMENT = gql`
  mutation Mutation($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      id
      content
    }
  }
`;

const COMMENT_SUBSCRIPTION = gql`
  subscription Subscription($postId: String!) {
    commentCreated(postId: $postId) {
      newComment {
        id
        postId
      }
    }
  }
`;

const POST_COMMENTS = gql`
  query PostComments($postId: String!) {
    postComments(postId: $postId) {
      id
      content
      authorId
      likers {
        id
        firstname
        lastname
        username
      }
      likersIds
      user {
        id
        firstname
        lastname
        email
        username
      }
    }
  }
`;
const LIKE_POST = gql`
  mutation Mutation($postId: String!) {
    likePost(postId: $postId)
  }
`;

const UNLIKE_POST = gql`
  mutation Mutation($postId: String!) {
    unlikePost(postId: $postId)
  }
`;
const LIKE_COMMENT = gql`
  mutation Mutation($commentId: String!) {
    likeComment(commentId: $commentId)
  }
`;

const UNLIKE_COMMENT = gql`
  mutation Mutation($commentId: String!) {
    unlikeComment(commentId: $commentId)
  }
`;
const COMMENT_LIKE_SUBSCRIPTION = gql`
  subscription Subscription($postId: String!) {
    commentLiked(postId: $postId) {
      comment {
        id
        postId
      }
    }
  }
`;

const COMMENT_UNLIKE_SUBSCRIPTION = gql`
  subscription Subscription($postId: String!) {
    commentUnliked(postId: $postId) {
      comment {
        id
        postId
      }
    }
  }
`;

function Publication({ post }: PublicationProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [comments, setComments] = useState(post.comments);
  const [commentsF, setCommentsF] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const { data: subData, loading: subLoading } = useSubscription(
    COMMENT_SUBSCRIPTION,
    {
      variables: { postId: post.id },
    }
  );
  const { data: likeSubData } = useSubscription(COMMENT_LIKE_SUBSCRIPTION, {
    variables: { postId: post.id },
  });
  const { data: unlikeSubData } = useSubscription(COMMENT_UNLIKE_SUBSCRIPTION, {
    variables: { postId: post.id },
    onComplete() {
      console.log('rr');
    },
  });

  const [postComments, { data: updatedPostComments, refetch }] = useLazyQuery(
    POST_COMMENTS,
    { variables: { postId: post.id } }
  );

  const [createComment, { loading, error, data }] = useMutation(ADD_COMMENT, {
    onCompleted(res) {
      setCommentContent('');
    },
  });

  const [likePost] = useMutation(LIKE_POST);
  const [likeComment] = useMutation(LIKE_COMMENT);
  const [unlikePost] = useMutation(UNLIKE_POST);
  const [unlikeComment] = useMutation(UNLIKE_COMMENT);

  const handleCreateComment = async () => {
    await createComment({
      variables: {
        createCommentInput: {
          content: commentContent,
          postId: post.id,
          postOwnerId: post.authorId,
        },
      },
    });
  };

  useEffect(() => {
    console.log();
    if (
      (subData?.commentCreated?.newComment &&
        subData?.commentCreated?.newComment.postId === post.id) ||
      (likeSubData?.commentLiked?.comment &&
        likeSubData?.commentLiked?.comment.postId === post.id) ||
      (unlikeSubData?.commentUnliked?.comment &&
        unlikeSubData?.commentUnliked?.comment.postId === post.id)
    ) {
      if (commentsF) {
        refetch();
      } else
        postComments({
          onCompleted(res) {
            setComments(res.postComments);
            setCommentsF(true);
          },
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postComments, subData, likeSubData, unlikeSubData, post.id]);

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
              <Avatar
                sx={{ width: '50px', height: '50px' }}
                alt="Avatar"
                src=""
              />
            </IconButton>
            <Stack justifyContent="center" pr={2}>
              <Typography fontWeight={700} sx={{ textTransform: 'capitalize' }}>
                {`${post.user.firstname} ${post.user.lastname}`}
              </Typography>
              <Typography fontSize={14} color="grey">
                {`${dateToNormalFormat(post.createdAt)}`}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ px: 4 }}>
        <Typography>{post.content}</Typography>
      </Box>
      {post.imageUrl && (
        <CardMedia
          component="img"
          alt="alt"
          image={post.imageUrl}
          sx={{ maxHeight: '450px' }}
        />
      )}
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
                  <LikeIcon
                    sx={{
                      my: 'auto',
                      cursor: 'pointer',
                      color: post.likersIds.includes(user.id)
                        ? '#305CE9'
                        : 'grey',
                    }}
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      post.likersIds.includes(user.id)
                        ? unlikePost({ variables: { postId: post.id } })
                        : likePost({ variables: { postId: post.id } });
                    }}
                  />
                  <Typography
                    lineHeight={2}
                    fontWeight={400}
                    color="grey"
                    mx=".2rem"
                  >
                    {post.likersIds.length}
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
                    {0}
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
              </Stack>
            </Stack>
          </Box>
        </Container>

        {comments.length > 0 && <Divider sx={{ my: 2 }} />}
        <Container>
          {comments.map((comment: Comment, index) => (
            <Stack key={comment.id} sx={{ px: 1 }}>
              <Stack
                direction="row"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <IconButton sx={{ my: 'auto' }}>
                  <Avatar alt="Avatar" sx={{ width: 30, height: 30 }} src="" />
                </IconButton>
                <Typography fontWeight={500} fontSize={14}>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={`/klader/${comment.user.username}`}
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
                      ? unlikeComment({ variables: { commentId: comment.id } })
                      : likeComment({ variables: { commentId: comment.id } });
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
              {index !== comments.length - 1 && <Divider sx={{ my: 1 }} />}
            </Stack>
          ))}
          {/* <Divider sx={{ my: 1 }} /> */}
        </Container>
        <Divider sx={{ my: 2 }} />
        <Container sx={{ pl: 0 }}>
          <Stack direction="row" sx={{ display: 'flex', alignItems: 'center' }}>
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
              onChange={(e) => setCommentContent(e.target.value)}
              value={commentContent}
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
            <IconButton
              sx={{ my: 'auto' }}
              onClick={() => handleCreateComment()}
            >
              <SendRounded />
            </IconButton>
          </Stack>
        </Container>
      </CardContent>
    </CustomCard>
  );
}

export default Publication;
