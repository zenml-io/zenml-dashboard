import _ from 'lodash';

import { State } from '../reducers/flavorPagesReducer';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.flavorPages') || {};

const getSelectedRunIds = (state: State): TId[] =>
  _.get(stateKey(state), 'selectedRunIds');

const getFetching = (state: State): boolean =>
  _.get(stateKey(state), 'fetching');

const flavorPagesSelectors = {
  selectedRunIds: getSelectedRunIds,
  fetching: getFetching,
};

export { flavorPagesSelectors };
