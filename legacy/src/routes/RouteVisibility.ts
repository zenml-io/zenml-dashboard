export enum RouteVisibilityAuthentication {
  authenticatedOnly = 'authenticatedOnly',
  unauthenticatedOnly = 'unauthenticatedOnly',
  always = 'always',
}

export interface RouteInterface {
  path: string;
  Component: React.ComponentType<any>;
  visibility: {
    authentication: RouteVisibilityAuthentication;
  };
  exact?: boolean;
}
