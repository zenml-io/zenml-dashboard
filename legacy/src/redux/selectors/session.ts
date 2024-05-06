import _ from 'lodash';

const authenticationToken = (state: any): string | null =>
  _.get(state, 'persisted.session.authenticationToken');

const hubToken = (state: any): string | null =>
  _.get(state, 'persisted.session.hubToken');

const isCookieAuthenticated = (state: any): boolean =>
  _.get(state, 'persisted.session.isCookieAuthenticated');

const sessionSelectors = {
  authenticationToken,
  hubToken,
  isCookieAuthenticated,
};

export { sessionSelectors };
