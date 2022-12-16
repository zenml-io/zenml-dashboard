import { RouteVisibilityAuthentication } from '../RouteVisibility';
import { loggedOutRoute, loggedInRoute } from '../../constants';

const isUnauthenticatedOrMissingRoute = (
  currentLocation: any | undefined,
): boolean =>
  currentLocation
    ? currentLocation.visibility &&
      currentLocation.visibility.authentication ===
        RouteVisibilityAuthentication.unauthenticatedOnly
    : false;

const isAuthenticatedOrMissingRoute = (
  currentLocation: any | undefined,
): boolean =>
  currentLocation
    ? currentLocation.visibility &&
      currentLocation.visibility.authentication ===
        RouteVisibilityAuthentication.authenticatedOnly
    : false;

let timeout = null as any;

export const replaceRouteIfNeeded = ({
  user,
  isAuthenticated,
  currentLocation,
  replaceRoute,
  routeFromSearchParam,
}: {
  user: any;
  isAuthenticated: any;
  currentLocation: any | undefined;
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
      if (user?.emailOptedIn === null) {
        route = `/user-email`;
      }
      console.log(currentLocation, 'currentLocation', routeFromSearchParam);

      if (replaceToLoggedOutRoute && currentLocation) {
        route = `${route}?route=${currentLocation.path}`;
      } else if (replaceToLoggedInRoute && routeFromSearchParam) {
        route = routeFromSearchParam;
      }

      replaceRoute(route);
    }, 0);
  }
};
