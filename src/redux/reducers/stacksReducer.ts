import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import { stackActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';
import { Stack } from '../../api/types';
export interface State {
  ids: TId[];
  byId: Record<TId, Stack>;
  myStackIds: TId[];
  paginated: any;
}

// type StacksPayload = Stack[];

// type StackPayload = Stack;

export type Action = {
  type: string;
  payload: any;
};

export const initialState: State = {
  ids: [],
  byId: {},
  myStackIds: [],
  paginated: {},
};

const newState = (state: State, stacks: Stack[], pagination?: any): State => ({
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

const stacksReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case stackActionTypes.getMyStacks.success: {
      const stacks: Stack[] = camelCaseArray(action.payload.items);

      const myStackIds: TId[] = stacks.map((stack: Stack) => stack.id);

      return { ...newState(state, stacks, action.payload), myStackIds };
    }

    case stackActionTypes.getStackForId.success: {
      const payload: Stack = action.payload;

      const stack = camelCaseObject(payload);

      return { ...state, ...newState(state, [stack]) };
    }

    default:
      return state;
  }
};

export default stacksReducer;
