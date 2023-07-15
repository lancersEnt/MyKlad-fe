/* eslint-disable import/prefer-default-export */
import { gql, useQuery } from '@apollo/client';

const ME = gql`
  query Me {
    me {
      id
      firstname
      lastname
      email
      username
    }
  }
`;

export const UseIsAuth = () => {
  const { loading, error, data } = useQuery(ME);
  return { loading, error, data };
};
