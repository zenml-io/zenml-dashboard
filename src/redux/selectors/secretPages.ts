import _ from 'lodash';

import { State } from '../reducers/secretPagesReducer';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.secretPages') || {};

// const getSelectedRunIds = (state: State): TId[] =>
//   _.get(stateKey(state), 'selectedRunIds');

const getFetching = (state: State): boolean =>
  _.get(stateKey(state), 'fetching');

const secretPagesSelectors = {
  // selectedRunIds: getSelectedRunIds,
  fetching: getFetching,
};

export { secretPagesSelectors };
