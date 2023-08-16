import _ from 'lodash';

import { State } from '../reducers/secretPagesReducer';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.secretPages') || {};

const getFetching = (state: State): boolean =>
  _.get(stateKey(state), 'fetching');

const secretPagesSelectors = {
  fetching: getFetching,
};

export { secretPagesSelectors };
