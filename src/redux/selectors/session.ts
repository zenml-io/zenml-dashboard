import _ from 'lodash';

const authenticationToken = (state: any): string | null =>
  _.get(state, 'persisted.session.authenticationToken');

const hubToken = (state: any): string | null =>
  _.get(state, 'persisted.session.hubToken');

const sessionSelectors = {
  authenticationToken,
  hubToken,
};

export { sessionSelectors };
