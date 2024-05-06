import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import { stackComponentActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';
import { StackComponent } from '../../api/types';

export interface State {
  ids: TId[];
  byId: Record<TId, StackComponent>;
  myStackComponentIds: TId[];
  stackComponentTypes: any[];
  paginated: any;
}

export type Action = {
  type: string;
  payload: any;
};

export const initialState: State = {
  ids: [],
  byId: {},
  myStackComponentIds: [],
  stackComponentTypes: [],
  paginated: {},
};

const newState = (
  state: State,
  stacks: StackComponent[],
  pagination?: any,
): State => ({
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

const stackComponentsReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case stackComponentActionTypes.getStackComponentList.success: {
      const stackComponents: StackComponent[] = camelCaseArray(
        action.payload.items,
      );

      const myStackComponentIds: TId[] = stackComponents.map(
        (stack: StackComponent) => stack.id,
      );

      return {
        ...newState(state, stackComponents, action.payload),
        myStackComponentIds,
      };
    }
    case stackComponentActionTypes.getStackComponentTypes.success: {
      let stackComponentTypes: string[] = action.payload;
      stackComponentTypes = stackComponentTypes.filter(
        (item) => item !== 'artifact_store' && item !== 'orchestrator',
      );
      stackComponentTypes.unshift('artifact_store');
      stackComponentTypes.unshift('orchestrator');

      return {
        ...state,
        stackComponentTypes,
      };
    }

    case stackComponentActionTypes.getStackComponentForId.success: {
      const payload = action.payload;

      const stackComponent = camelCaseObject(payload);

      return { ...state, ...newState(state, [stackComponent]) };
    }

    default:
      return state;
  }
};

export default stackComponentsReducer;
