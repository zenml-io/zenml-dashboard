import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import { stackComponentActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, TStack>;
  myStackComponentIds: TId[];
  stackComponentTypes: any[];
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
  myStackComponentIds: [],
  stackComponentTypes: [],
};

const newState = (state: State, stacks: TStack[]): State => ({
  ...state,
  ids: idsInsert(state.ids, stacks),
  byId: byKeyInsert(state.byId, stacks),
});

const stackComponentsReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case stackComponentActionTypes.getStackComponentList.success: {
      const stackComponents: TStack[] = camelCaseArray(
        action.payload as StacksPayload,
      );

      const myStackComponentIds: TId[] = stackComponents.map(
        (stack: TStack) => stack.id,
      );

      return { ...newState(state, stackComponents), myStackComponentIds };
    }
    case stackComponentActionTypes.getStackComponentTypes.success: {
      const stackComponentTypes: any[] = action.payload as StacksPayload;

      return {
        ...state,
        stackComponentTypes,
      };
    }

    case stackComponentActionTypes.getStackComponentForId.success: {
      const payload: StackPayload = action.payload;

      const stackComponent = camelCaseObject(payload);

      return { ...state, ...newState(state, [stackComponent]) };
    }

    default:
      return state;
  }
};

export default stackComponentsReducer;
