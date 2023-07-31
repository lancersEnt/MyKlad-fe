/* eslint-disable import/prefer-default-export */
import { gql, useQuery } from '@apollo/client';

const ME = gql`
  query Me {
    me {
      id
      firstname
      lastname
      username
      dateOfBirth
      city
      address
      nationality
      phone
      profilePictureUrl
      email
      followers {
        firstname
        lastname
        username
        profilePictureUrl
        email
      }
      following {
        firstname
        lastname
        username
        profilePictureUrl
        email
      }
    }
  }
`;
export const UseIsAuth = () => {
  const { data, loading } = useQuery(ME);

  return { data, loading };
};
