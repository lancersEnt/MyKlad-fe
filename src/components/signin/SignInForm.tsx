/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, MouseEvent, ReactElement } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';

import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Google } from '../../assets/social logos/google.svg';
import { ReactComponent as Facebook } from '../../assets/social logos/facebook.svg';

import CustomTextField from '../common/inputs/CustomTextField';

type FormValues = {
  email: string;
  password: string;
};
const signinMutation = `
mutation Login($data: LoginUserInput!) {
  login(data: $data) {
    errors {
      field
      message
    }
    user {
      id
      email
      firstname
      lastname
      permissions
      username
    }
  }
}
`;
const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
          email: {
            type: 'required',
            message: 'This is required.',
          },
          password: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};

function SigninForm(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    const graphqlMutation = gql`
      query Query($user: LoginUserInput!) {
        login(user: $user) {
          user {
            id
            firstname
            lastname
            email
            password
            username
            permissions
            passwordReset
            createdAt
            updatedAt
          }
          token
        }
      }
    `;
    // signin mutation
    const headers = {
      'content-type': 'application/json',
    };
    axios.post(
      'http://localhost:3000/graphql',
      {
        query: print(graphqlMutation),
        variables: {
          user: data,
        },
      },
      { withCredentials: true }
    );
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const refreshToken = () => {
    const graphqlMutation = gql`
      query Query {
        refreshToken
      }
    `;
    const headers = {
      'content-type': 'application/json',
    };
    axios.post(
      'http://localhost:3000/graphql',
      {
        query: print(graphqlMutation),
      },
      { withCredentials: true }
    );
  };

  const addPost = () => {
    const graphqlMutation = gql`
      mutation Mutation($createCommentInput: CreateCommentInput!) {
        createComment(createCommentInput: $createCommentInput) {
          id
          content
          authorId
          postId
          user {
            id
            username
          }
          post {
            id
            content
          }
          createdAt
          updatedAt
        }
      }
    `;
    const headers = {
      'content-type': 'application/json',
    };
    axios.post(
      'http://localhost:3000/graphql',
      {
        query: print(graphqlMutation),
        variables: {
          createCommentInput: {
            authorId: 'e75ec2a8-30bc-4246-a194-8cbc91e657b4',
            postId: '1496955d-0364-4a97-9db9-10e8b1d299f5',
            content: 'haw he4a commentaire mel telifoun',
          },
        },
      },
      { withCredentials: true }
    );
  };
  const navigate = useNavigate();

  return (
    <Box
      py="3rem"
      px={{ md: '3rem', sm: '2rem', xs: '1rem' }}
      boxShadow="3"
      ml={{ md: '0px', sm: 'auto', xs: 'auto' }}
      sx={{
        mr: 'auto',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        maxWidth: '400px',
      }}
    >
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <Typography mx="auto" variant="h5" fontWeight={500}>
            Identifiez-vous
          </Typography>
          <CustomTextField
            InputProps={{ disableUnderline: true }}
            variant="filled"
            label="Email"
            {...register('email')}
          />
          <CustomTextField
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOffOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="filled"
            type={showPassword ? 'text' : 'password'}
            label="Mot de passe"
            {...register('password')}
          />
          <Typography
            color="primary"
            fontSize="12px"
            textAlign="right"
            variant="caption"
            sx={{ marginTop: '.25rem !important' }}
          >
            {' '}
            Mot de passe oublié ?
          </Typography>
          <Button
            size="large"
            sx={{ borderRadius: '50px', textTransform: 'unset' }}
            variant="contained"
            type="submit"
          >
            <Typography py=".5rem" fontSize=".8rem">
              Connexion
            </Typography>
          </Button>
          <Divider sx={{ fontSize: '1rem', fontWeight: '500', color: 'grey' }}>
            {'   '}OU
          </Divider>
          <Button
            size="large"
            style={{
              borderRadius: '50px',
              textTransform: 'unset',
            }}
            variant="outlined"
            color="secondary"
            onClick={() => refreshToken()}
          >
            <Stack direction="row" spacing={2}>
              <Google />
              <Typography color="black" fontSize=".8rem" lineHeight={2}>
                Se connecter avec Google
              </Typography>
            </Stack>
          </Button>
          <Button
            size="large"
            style={{ borderRadius: '50px', textTransform: 'unset' }}
            variant="outlined"
            color="secondary"
            onClick={() => addPost()}
          >
            <Stack direction="row" spacing={2}>
              <Facebook />
              <Typography color="black" fontSize=".8rem" lineHeight={2}>
                Se connecter avec Facebook
              </Typography>
            </Stack>
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default SigninForm;
