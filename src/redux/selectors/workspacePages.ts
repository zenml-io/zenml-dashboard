import _ from 'lodash';

import { State } from '../reducers/workspacePagesReducer';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.workspacePages') || {};

const getFetching = (state: State): boolean =>
  _.get(stateKey(state), 'fetching');

const workspacePagesSelectors = {
  fetching: getFetching,
};

export { workspacePagesSelectors };
