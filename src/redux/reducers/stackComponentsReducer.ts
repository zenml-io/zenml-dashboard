import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import { stackActionTypes, workspaceActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, TStack>;
  myStackIds: TId[];
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
};

const newState = (state: State, stacks: TStack[]): State => ({
  ...state,
  ids: idsInsert(state.ids, stacks),
  byId: byKeyInsert(state.byId, stacks),
});

const stacksReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case stackActionTypes.getMyStacks.success:
    case workspaceActionTypes.getPipelinesForWorkspaceId.success: {
      const stacks: TStack[] = camelCaseArray(action.payload as StacksPayload);

      const myStackIds: TId[] = stacks.map((stack: TStack) => stack.id);

      return { ...newState(state, stacks), myStackIds };
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
