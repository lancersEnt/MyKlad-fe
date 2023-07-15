/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/function-component-definition */
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../app/store';

interface PropType {
  component: React.FC;
}

const UnloggedRoutes: FC<PropType> = ({ component: Component }) => {
  const location = useLocation();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (isAuthenticated)
    return (
      <Navigate
        to={location.state?.from ? location.state.from.pathname : '/'}
      />
    );
  return <Component />;
};

export default UnloggedRoutes;
