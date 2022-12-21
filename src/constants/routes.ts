import { routePaths } from '../routes/routePaths';
export const loggedOutRoute = routePaths.login;
export const loggedInRoute = routePaths.home(':string');
