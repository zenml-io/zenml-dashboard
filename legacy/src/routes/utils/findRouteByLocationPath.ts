import { matchPath } from 'react-router';

import { appRoutesConfig } from '../appRoutesConfig';

export const findRouteByLocationPath = (locationPath: string) => {
  const foundRoute = appRoutesConfig.find((route) =>
    matchPath(locationPath, {
      path: route.path,
      exact: route.exact,
      strict: true,
    }),
  );
  return foundRoute;
};
