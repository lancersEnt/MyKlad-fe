/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/function-component-definition */
import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

interface PropType {
  component: React.FC;
}

const UnloggedRoutes: FC<PropType> = ({ component: Component }) => {
  const { access_token } = useAppSelector((state) => state.auth);
  console.log(access_token);
  // if (access_token) return <Navigate to="/" />;
  return <Component />;
};

export default UnloggedRoutes;
