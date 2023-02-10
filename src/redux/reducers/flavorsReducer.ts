import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import { flavorActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, TStack>;
  myflavorIds: TId[];
  flavorByType: any[];
  paginated: any;
}

type FlavorsPayload = any[];

type FlavorPayload = any;

export type Action = {
  type: string;
  payload: any;
};

export const initialState: State = {
  ids: [],
  byId: {},
  myflavorIds: [],
  flavorByType: [],
  paginated: {},
};

const newState = (state: State, flavors: any[], pagination?: any): State => ({
  ...state,
  ids: idsInsert(state.ids, flavors),
  byId: byKeyInsert(state.byId, flavors),
  paginated: {
    page: pagination.page,
    size: pagination.size,
    totalPages: pagination.total_pages,
    totalitem: pagination.total,
  },
});

const stackComponentsReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case flavorActionTypes.getFlavorAll.success: {
      const flavors: TStack[] = camelCaseArray(
        action.payload.items as FlavorsPayload,
      );

      const myflavorIds: TId[] = flavors.map((stack: TStack) => stack.id);

      return {
        ...newState(state, flavors, action.payload),
        myflavorIds,
      };
    }
    case flavorActionTypes.getFlavorType.success: {
      const flavors: TStack[] = camelCaseArray(
        action.payload.items as FlavorsPayload,
      );

      const myflavorIds: TId[] = flavors.map((stack: TStack) => stack.id);

      return {
        ...newState(state, flavors, action.payload),
        myflavorIds,
      };
    }

    // case flavorActionTypes.getStackComponentForId.success: {
    //   const payload: StackPayload = action.payload;

    //   const stackComponent = camelCaseObject(payload);

    //   return { ...state, ...newState(state, [stackComponent]) };
    // }

    default:
      return state;
  }
};

export default stackComponentsReducer;
