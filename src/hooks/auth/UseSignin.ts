/* eslint-disable import/prefer-default-export */
import { useDispatch } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/authSlice';
import { SIGN_IN } from '../../utils/GraphQL/Mutations';

export const UseSignin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signin, { loading, error, data }] = useMutation(SIGN_IN, {
    onCompleted(res) {
      if (res.login) {
        dispatch(login(res.login.user));
        navigate('/', { preventScrollReset: false });
      }
    },
  });
  return { signin, loading, error, data };
};
