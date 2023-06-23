/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/function-component-definition */
import { FC } from 'react';

interface PropType {
  component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
  // if (access_token)
  return <Component />;
  // return <Navigate to="/signin" />;
};

export default PrivateRoute;
