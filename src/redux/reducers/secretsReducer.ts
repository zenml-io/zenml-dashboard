import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import { secretActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, any>;
  mySecretIds: TId[];
  paginated: any;
}

type SecretsPayload = any[];

type SecretPayload = any;

export type Action = {
  type: string;
  payload: any;
};

export const initialState: State = {
  ids: [],
  byId: {},
  mySecretIds: [],
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

const secretsReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case secretActionTypes.getMySecrets.success: {
      const secrets: any[] = camelCaseArray(
        action.payload.items as SecretsPayload,
      );

      const mySecretIds: TId[] = secrets.map((stack: any) => stack.id);

      return { ...newState(state, secrets, action.payload), mySecretIds };
    }

    case secretActionTypes.getSecretForId.success: {
      const payload: SecretPayload = action.payload;

      const secret = camelCaseObject(payload);

      return { ...state, ...newState(state, [secret]) };
    }

    default:
      return state;
  }
};

export default secretsReducer;
