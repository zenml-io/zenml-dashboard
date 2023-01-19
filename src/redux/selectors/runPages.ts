import _ from 'lodash';

import { State } from '../reducers/runPagesReducer';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.runPages') || {};

const getSelectedRunIds = (state: State): TId[] =>
  _.get(stateKey(state), 'selectedRunIds');

const getFetching = (state: State): boolean =>
  _.get(stateKey(state), 'fetching');

const runPagesSelectors = {
  selectedRunIds: getSelectedRunIds,
  fetching: getFetching,
};

export { runPagesSelectors };
