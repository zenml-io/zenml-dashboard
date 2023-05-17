import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import { connectorActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, any>;
  myConnectorIds: TId[];
  paginated: any;
}

type ConnectorsPayload = any[];

type ConnectorPayload = any;

export type Action = {
  type: string;
  payload: any;
};

export const initialState: State = {
  ids: [],
  byId: {},
  myConnectorIds: [],
  paginated: {},
};

const newState = (state: State, stacks: any[], pagination?: any): State => ({
  ...state,
  ids: idsInsert(state.ids, stacks),
  byId: byKeyInsert(state.byId, stacks),
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
      const connectors: any[] = camelCaseArray(
        action.payload.items as ConnectorsPayload,
      );

      const myConnectorIds: TId[] = connectors.map((stack: any) => stack.id);

      return { ...newState(state, connectors, action.payload), myConnectorIds };
    }

    case connectorActionTypes.getConnectorForId.success: {
      const payload: ConnectorPayload = action.payload;

      const connector = camelCaseObject(payload);

      return { ...state, ...newState(state, [connector]) };
    }

    default:
      return state;
  }
};

export default connectorsReducer;