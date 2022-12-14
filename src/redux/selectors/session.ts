import _ from 'lodash';

const authenticationToken = (state: any): string | null =>
  _.get(state, 'persisted.session.authenticationToken');

const sessionSelectors = {
  authenticationToken,
};
export { sessionSelectors };
