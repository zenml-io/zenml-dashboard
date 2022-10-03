import {
  RouteInterface,
  RouteVisibilityAuthentication,
} from '../RouteVisibility';
import { loggedOutRoute, loggedInRoute } from '../../constants';

const isUnauthenticatedOrMissingRoute = (
  currentLocation: RouteInterface | undefined,
): boolean =>
  currentLocation
    ? currentLocation.visibility &&
      currentLocation.visibility.authentication ===
        RouteVisibilityAuthentication.unauthenticatedOnly
    : false;

const isAuthenticatedOrMissingRoute = (
  currentLocation: RouteInterface | undefined,
): boolean =>
  currentLocation
    ? currentLocation.visibility &&
      currentLocation.visibility.authentication ===
        RouteVisibilityAuthentication.authenticatedOnly
    : false;

let timeout = null as any;

export const replaceRouteIfNeeded = ({
  isAuthenticated,
  currentLocation,
  replaceRoute,
  routeFromSearchParam,
}: {
  isAuthenticated: any;
  currentLocation: RouteInterface | undefined;
  replaceRoute: (arg1: string) => void;
  routeFromSearchParam: null | string;
}): void => {
  clearTimeout(timeout);
  const routeToReplace = () => {
    return isAuthenticated ? loggedInRoute : loggedOutRoute;
  };
  const replaceToLoggedInRoute =
    isAuthenticated && isUnauthenticatedOrMissingRoute(currentLocation);

  const replaceToLoggedOutRoute =
    !isAuthenticated && isAuthenticatedOrMissingRoute(currentLocation);

  const shouldReplaceRoute = replaceToLoggedInRoute || replaceToLoggedOutRoute;

  if (shouldReplaceRoute) {
    timeout = setTimeout(() => {
      let route = routeToReplace();

      if (replaceToLoggedOutRoute && currentLocation) {
        // route = `${route}?route=${currentLocation.path}`;
        route = `${route}?route=/`;
      } else if (replaceToLoggedInRoute && routeFromSearchParam) {
        route = routeFromSearchParam;
      }

      replaceRoute(route);
    }, 0);
  }
};
