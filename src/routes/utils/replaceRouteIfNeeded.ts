import {
  RouteInterface,
  RouteVisibilityAuthentication,
} from '../RouteVisibility';
import { loggedOutRoute, DEFAULT_WORKSPACE_NAME } from '../../constants';
import { routePaths } from '../routePaths';

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
  locationPath,
  user,
  isAuthenticated,
  currentLocation,
  replaceRoute,
  routeFromSearchParam,
}: {
  locationPath?: any;
  user: any;
  isAuthenticated: any;
  currentLocation: RouteInterface | undefined;
  replaceRoute: (arg1: string) => void;
  routeFromSearchParam: null | string;
}): void => {
  clearTimeout(timeout);

  const routeToReplace = () => {
    const logRoute =
      user?.emailOptedIn === null
        ? `/user-email`
        : routePaths.dashboard(DEFAULT_WORKSPACE_NAME);

    return isAuthenticated ? logRoute : loggedOutRoute;
  };
  const replaceToLoggedInRoute =
    isAuthenticated && isUnauthenticatedOrMissingRoute(currentLocation);

  const replaceToLoggedOutRoute =
    !isAuthenticated && isAuthenticatedOrMissingRoute(currentLocation);

  const replaceToLoggedInRouteForEmailOptedIn =
    isAuthenticated &&
    user?.emailOptedIn === null &&
    currentLocation?.path !== `/user-email`;
  const shouldReplaceRoute =
    replaceToLoggedInRoute ||
    replaceToLoggedOutRoute ||
    replaceToLoggedInRouteForEmailOptedIn;

  if (shouldReplaceRoute) {
    timeout = setTimeout(() => {
      let route = routeToReplace();

      if (replaceToLoggedOutRoute && currentLocation) {
        route = `${route}?route=${locationPath}`;
      } else if (replaceToLoggedInRoute && routeFromSearchParam) {
        route = routeFromSearchParam;
      }

      replaceRoute(route);
    }, 0);
  }
};
