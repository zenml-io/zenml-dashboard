import { RouteInterface } from '../RouteVisibility';

export function isRouteFound({
  currentLocation,
}: {
  currentLocation: RouteInterface | undefined;
}): boolean {
  if (!currentLocation) return true;

  return false;
}
