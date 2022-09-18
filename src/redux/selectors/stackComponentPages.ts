import _ from 'lodash';

import { State } from '../reducers/stackComponentPagesReducer';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.stackComponentPages') || {};

const getCurrentWorkspace = (state: State): TWorkspace | null =>
  _.get(stateKey(state), 'currentWorkspace');

const getSelectedRunIds = (state: State): TId[] =>
  _.get(stateKey(state), 'selectedRunIds');

const getFetching = (state: State): boolean =>
  _.get(stateKey(state), 'fetching');

const stackComponentPagesSelectors = {
  currentWorkspace: getCurrentWorkspace,
  selectedRunIds: getSelectedRunIds,
  fetching: getFetching,
};

export { stackComponentPagesSelectors };
