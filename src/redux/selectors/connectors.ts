import _ from 'lodash';
import { Selector } from 'reselect';

import { State } from '../reducers/connectorsReducer';
import { createSelector } from './createSelector';
import { extractItemFromById } from './utils';
import { ServiceConnector, ServiceConnectorTypes } from '../../api/types';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.connectors') || {};

const getById = (state: State): Record<TId, ServiceConnector> =>
  _.get(stateKey(state), 'byId');

const getMyConnectorIds = (state: State): TId[] =>
  _.get(stateKey(state), 'myConnectorIds');

const getMyConnectorPaginated = (state: State): any =>
  _.get(stateKey(state), 'paginated');

const getConnectorTypes = (state: State): ServiceConnectorTypes[] =>
  _.get(stateKey(state), 'connectorTypes');
const getConnectorComponents = (state: State): any =>
  _.get(stateKey(state), 'connectorComponentsIds');

export const myConnectors = (state?: State | null): ServiceConnector[] => {
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

export const connectorComponents = (
  state?: State | null,
): ServiceConnector[] => {
  if (!state) return [];
  const connectorComponentsIds = getConnectorComponents(state);
  const byId = getById(state);

  return (connectorComponentsIds || []).reduce(
    (current: ServiceConnector[], id: TId) => {
      const connector = byId[id];

      if (connector) {
        current = [...current, connector];
      }

      return current;
    },
    [] as any[],
  );
};

export const myConnectorsPaginated = (state?: State | null): any => {
  if (!state) return {};
  const paginated = getMyConnectorPaginated(state);

  return paginated;
};

export const connectorForId = (
  connectorId: TId,
): Selector<any, ServiceConnector> =>
  createSelector(getById, extractItemFromById(connectorId));

export const myConnectorsTypes = (
  state?: State | null,
): ServiceConnectorTypes[] => {
  if (!state) return [];
  const connectorsTypes = getConnectorTypes(state);
  return connectorsTypes;
};

const connectorSelectors = {
  myConnectorsPaginated: myConnectorsPaginated,
  myConnectors: myConnectors,
  connectorForId,
  myConnectorsTypes,
  connectorComponents,
};

export { connectorSelectors };
