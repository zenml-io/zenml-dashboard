import _ from 'lodash';
import { Selector } from 'reselect';

import { State } from '../reducers/connectorsReducer';
import { createSelector } from './createSelector';
import { extractItemFromById } from './utils';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.connectors') || {};

const getById = (state: State): Record<TId, any> =>
  _.get(stateKey(state), 'byId');

const getMyConnectorIds = (state: State): TId[] =>
  _.get(stateKey(state), 'myConnectorIds');

const getMyConnectorPaginated = (state: State): any =>
  _.get(stateKey(state), 'paginated');

const getConnectorsList = (state: State): any =>
  _.get(stateKey(state), 'connectorsList');

export const myConnectors = (state?: State | null): any[] => {
  if (!state) return [];
  const myConnectorIds = getMyConnectorIds(state);
  const byId = getById(state);

  return (myConnectorIds || []).reduce((current: any[], id: TId) => {
    const connector = byId[id];

    if (connector) {
      current = [...current, connector];
    }

    return current;
  }, [] as any[]);
};

export const myConnectorsPaginated = (state?: State | null): any => {
  if (!state) return {};
  const paginated = getMyConnectorPaginated(state);

  return paginated;
};

export const connectorForId = (connectorId: TId): Selector<any, any> =>
  createSelector(getById, extractItemFromById(connectorId));

export const myConnectorsList = (state?: State | null): any => {
  if (!state) return {};
  const connectorsList = getConnectorsList(state);
  return connectorsList;
};

const connectorSelectors = {
  myConnectorsPaginated: myConnectorsPaginated,
  myConnectors: myConnectors,
  connectorForId,
  myConnectorsList,
};

export { connectorSelectors };
