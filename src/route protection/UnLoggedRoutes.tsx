/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/function-component-definition */
import { FC } from 'react';

interface PropType {
  component: React.FC;
}

const UnloggedRoutes: FC<PropType> = ({ component: Component }) => {
  // if (access_token) return <Navigate to="/" />;é
  return <Component />;
};

export default UnloggedRoutes;
