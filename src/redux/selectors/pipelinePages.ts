import _ from 'lodash';

import { State } from '../reducers/pipelinePagesReducer';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.pipelinePages') || {};

const getCurrentWorkspace = (state: State): TWorkspace | null =>
  _.get(stateKey(state), 'currentWorkspace');

const getSelectedRunIds = (state: State): TId[] =>
  _.get(stateKey(state), 'selectedRunIds');

const getFetching = (state: State): boolean =>
  _.get(stateKey(state), 'fetching');

const pipelinePagesSelectors = {
  currentWorkspace: getCurrentWorkspace,
  selectedRunIds: getSelectedRunIds,
  fetching: getFetching,
};

export { pipelinePagesSelectors };
