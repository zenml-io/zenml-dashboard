import _ from 'lodash';

import { State } from '../reducers/stackPagesReducer';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.stackPages') || {};

const getSelectedRunIds = (state: State): TId[] =>
  _.get(stateKey(state), 'selectedRunIds');

const getFetching = (state: State): boolean =>
  _.get(stateKey(state), 'fetching');

const stackPagesSelectors = {
  selectedRunIds: getSelectedRunIds,
  fetching: getFetching,
};

export { stackPagesSelectors };
