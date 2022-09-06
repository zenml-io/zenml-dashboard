/* eslint-disable */

import * as React from 'react';

import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch,
} from 'react-router-dom';

import {
  useReplaceRoute,
  useSelector,
  useLocationPath,
  useGetSearchParam,
} from '../ui/hooks';

import { sessionSelectors } from '../redux/selectors/session';

import { replaceRouteIfNeeded } from './utils/replaceRouteIfNeeded';
import { findRouteByLocationPath } from './utils/findRouteByLocationPath';
import { appRoutesConfig } from './appRoutesConfig';

import { WaitToEnter } from '../ui/components';

import { isRouteFound } from './utils/isRouteFound';
import { NotFound } from '../ui/layouts/NotFound';

const useReplaceRouteIfNeeded = ({
  currentLocation,
  setNotFound,
}: any): void => {
  const { replaceRoute } = useReplaceRoute();

  const routeFromSearchParam = useGetSearchParam('route');

  const isAuthenticated = useSelector(sessionSelectors.authenticationToken);

  React.useEffect(() => {
    setNotFound(
      isRouteFound({
        currentLocation,
      }),
    );
  }, [currentLocation]);

  React.useEffect(() => {
    replaceRouteIfNeeded({
      currentLocation,
      isAuthenticated,
      replaceRoute,
      routeFromSearchParam,
    });
  }, [currentLocation, isAuthenticated, replaceRoute]);
};

export const AppRoute = ({ path, component, exact }: any): JSX.Element => {
  const [notFound, setNotFound] = React.useState();

  const locationPath = useLocationPath();

  const currentLocation = findRouteByLocationPath(locationPath);

  useReplaceRouteIfNeeded({
    currentLocation,
    setNotFound,
  });

  if (notFound) return <NotFound />;

  return <Route exact={exact} path={path} component={component} />;
};

const ScrollToTopOnNavigate = withRouter(
  ({ children, location: { pathname } }: any) => {
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return children || null;
  },
);

export const RouteConfig: React.FC = () => {
  return (
    <WaitToEnter timeToEnter={300}>
      <Router>
        <ScrollToTopOnNavigate />
        <Switch>
          {appRoutesConfig.map((route, i) => (
            <AppRoute
              key={i}
              path={route.path}
              exact={route.exact}
              component={route.Component}
            />
          ))}
          <Route exact={true} component={NotFound} />
        </Switch>
      </Router>
    </WaitToEnter>
  );
};
