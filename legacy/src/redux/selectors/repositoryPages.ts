import _ from 'lodash';

import { State } from '../reducers/secretPagesReducer';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.repositoriesPages') || {};

const getFetching = (state: State): boolean =>
  _.get(stateKey(state), 'fetching');

const repositoryPagesSelectors = {
  fetching: getFetching,
};

export { repositoryPagesSelectors };
