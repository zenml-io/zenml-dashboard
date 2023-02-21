import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import { stackActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, TStack>;
  myStackIds: TId[];
  paginated: any;
}

type StacksPayload = TStack[];

type StackPayload = TStack;

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

const newState = (state: State, stacks: TStack[], pagination?: any): State => ({
  ...state,
  ids: idsInsert(state.ids, stacks),
  byId: byKeyInsert(state.byId, stacks),
  paginated: {
    index: pagination.index,
    max_size: pagination.max_size,
    totalPages: pagination.total_pages,
    totalitem: pagination.total,
  },
});

const stacksReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case stackActionTypes.getMyStacks.success: {
      const stacks: TStack[] = camelCaseArray(
        action.payload.items as StacksPayload,
      );

      const myStackIds: TId[] = stacks.map((stack: TStack) => stack.id);

      return { ...newState(state, stacks, action.payload), myStackIds };
    }

    case stackActionTypes.getStackForId.success: {
      const payload: StackPayload = action.payload;

      const stack = camelCaseObject(payload);

      return { ...state, ...newState(state, [stack]) };
    }

    default:
      return state;
  }
};

export default stacksReducer;
