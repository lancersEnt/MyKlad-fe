/* eslint-disable import/prefer-default-export */
import { gql, useMutation } from '@apollo/client';

const SIGNUP = gql`
  mutation signup($createUserInput: CreateUserInput!) {
    signup(createUserInput: $createUserInput) {
      id
      email
    }
  }
`;

export const UseSignup = (setSignedUp: any, reset: any) => {
  const [signup, { loading, error, data }] = useMutation(SIGNUP, {
    onCompleted() {
      setSignedUp(true);
      reset();
    },
  });

  return { signup, loading, error, data };
};
