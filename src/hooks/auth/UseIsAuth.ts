/* eslint-disable import/prefer-default-export */
import { gql, useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';

const ME = gql`
  query Me {
    me {
      id
      firstname
      lastname
      username
      email
      followers {
        firstname
        lastname
        username
        email
      }
      following {
        firstname
        lastname
        username
        email
      }
    }
  }
`;
export const UseIsAuth = () => {
  const { data, loading } = useQuery(ME);

  return { data, loading };
};
