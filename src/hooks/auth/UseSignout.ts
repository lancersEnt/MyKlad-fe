/* eslint-disable import/prefer-default-export */
import { useDispatch } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { SIGN_OUT } from '../../utils/GraphQL/Mutations';

export const UseSignout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signout, { loading, error, data }] = useMutation(SIGN_OUT, {
    onCompleted(res) {
      if (res.logout) {
        dispatch(logout());
        navigate('/signin', { preventScrollReset: false });
      }
    },
  });
  return { signout, loading, error, data };
};
