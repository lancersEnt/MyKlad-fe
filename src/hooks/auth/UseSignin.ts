/* eslint-disable import/prefer-default-export */
import { useDispatch } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/authSlice';

const SIGN_IN = gql`
  mutation Login($user: LoginUserInput!) {
    login(user: $user) {
      user {
        id
        firstname
        lastname
        username
        email
        city
        nationality
        dateOfBirth
        address
        phone
        profilePictureUrl
        followers {
          username
          firstname
          lastname
          profilePictureUrl
        }
        following {
          username
          firstname
          lastname
          profilePictureUrl
        }
      }
    }
  }
`;

export const UseSignin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signin, { loading, error, data }] = useMutation(SIGN_IN, {
    onCompleted(res) {
      if (res.login) {
        dispatch(login(res.login.user));
        navigate('/');
      }
    },
  });
  return { signin, loading, error, data };
};
