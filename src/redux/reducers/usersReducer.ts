import { camelCaseObject } from '../../utils/camelCase';
import { userActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, TUser>;
  myUserId: TId | null;
}

export type Action = {
  type: string;
  payload: TUser;
};

export const initialState: State = {
  ids: [],
  byId: {},
  myUserId: null,
};

const newState = (state: State, users: TUser[]): State => ({
  ...state,
  ids: idsInsert(state.ids, users),
  byId: byKeyInsert(state.byId, users),
});

const usersReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case userActionTypes.getMyUser.success: {
      const user: TUser = camelCaseObject(action.payload);

      const myUserId: TId = user.id;

      return { ...state, ...newState(state, [user]), myUserId };
    }
    case userActionTypes.getUserForId.success: {
      const user: TUser = camelCaseObject(action.payload);

      return { ...state, ...newState(state, [user]) };
    }

    case userActionTypes.updateUserEmail.success: {
      const user: TUser = camelCaseObject(action.payload);

      return { ...state, ...newState(state, [user]) };
    }

    default:
      return state;
  }
};

export default usersReducer;
