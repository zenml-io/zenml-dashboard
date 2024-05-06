import { Secret } from '../../api/types';
import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import { secretActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, Secret>;
  mySecretIds: TId[];
  paginated: any;
}

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

const newState = (
  state: State,
  secrets: Secret[],
  pagination?: any,
): State => ({
  ...state,
  ids: idsInsert(state.ids, secrets),
  byId: byKeyInsert(state.byId, secrets),
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
      const secrets: Secret[] = camelCaseArray(action.payload.items);

      const mySecretIds: TId[] = secrets.map((secret: Secret) => secret.id);

      return { ...newState(state, secrets, action.payload), mySecretIds };
    }

    case secretActionTypes.getSecretForId.success: {
      const payload: Secret = action.payload;

      const secret = camelCaseObject(payload);

      return { ...state, ...newState(state, [secret]) };
    }

    default:
      return state;
  }
};

export default secretsReducer;
