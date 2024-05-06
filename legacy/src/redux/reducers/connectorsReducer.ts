import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import { connectorActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';
import { ServiceConnector, ServiceConnectorTypes } from '../../api/types';

export interface State {
  ids: TId[];
  byId: Record<TId, ServiceConnector>;
  myConnectorIds: TId[];
  connectorComponentsIds: TId[];
  connectorTypes: ServiceConnectorTypes[];
  paginated: any;
}

export type Action = {
  type: string;
  payload: any;
};

export const initialState: State = {
  ids: [],
  byId: {},
  myConnectorIds: [],
  connectorComponentsIds: [],
  connectorTypes: [],

  paginated: {},
};

const newState = (
  state: State,
  connectors: ServiceConnector[],
  pagination?: any,
): State => ({
  ...state,
  ids: idsInsert(state.ids, connectors),
  byId: byKeyInsert(state.byId, connectors),
  paginated: {
    page: pagination?.index,
    size: pagination?.max_size,
    totalPages: pagination?.total_pages,
    totalitem: pagination?.total,
  },
});

const connectorsReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case connectorActionTypes.getMyConnectors.success: {
      const connectors: ServiceConnector[] = camelCaseArray(
        action.payload.items,
      );

      const myConnectorIds: TId[] = connectors.map(
        (connector: ServiceConnector) => connector.id,
      );

      return { ...newState(state, connectors, action.payload), myConnectorIds };
    }
    case connectorActionTypes.getConnectorComponents.success: {
      const connectorComponents: ServiceConnector[] = camelCaseArray(
        action.payload.items,
      );

      const connectorComponentsIds: TId[] = connectorComponents.map(
        (connector: ServiceConnector) => connector.id,
      );

      return {
        ...newState(state, connectorComponents, action.payload),
        connectorComponentsIds,
      };
    }

    case connectorActionTypes.getConnectorForId.success: {
      const payload = action.payload;

      const connector = camelCaseObject(payload);

      return { ...state, ...newState(state, [connector]) };
    }

    case connectorActionTypes.connectorsTypes.success: {
      const connectorTypes: ServiceConnectorTypes[] = camelCaseArray(
        action.payload,
      );

      return {
        ...state,
        connectorTypes,
      };
    }

    default:
      return state;
  }
};

export default connectorsReducer;
