/* eslint-disable import/prefer-default-export */
import { gql, useMutation } from '@apollo/client';
import { SIGNUP } from '../../utils/GraphQL/Mutations';

export const UseSignup = (setSignedUp: any, reset: any) => {
  const [signup, { loading, error, data }] = useMutation(SIGNUP, {
    onCompleted() {
      setSignedUp(true);
      reset();
    },
  });

  return { signup, loading, error, data };
};
