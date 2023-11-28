import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import { flavorActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';
import { Flavor } from '../../api/types';

export interface State {
  ids: TId[];
  byId: Record<TId, Flavor>;
  myflavorIds: TId[];
  flavorByType: any[];
  paginated: any;
}

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

const newState = (
  state: State,
  flavors: Flavor[],
  pagination?: any,
): State => ({
  ...state,
  ids: idsInsert(state.ids, flavors),
  byId: byKeyInsert(state.byId, flavors),
  paginated: {
    page: pagination?.index,
    size: pagination?.max_size,
    totalPages: pagination?.total_pages,
    totalitem: pagination?.total,
  },
});

const flavorsReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case flavorActionTypes.getFlavorAll.success: {
      const flavors: Flavor[] = camelCaseArray(action.payload.items);

      const myflavorIds: TId[] = flavors.map((flavor: Flavor) => flavor.id);

      return {
        ...newState(state, flavors, action.payload),
        myflavorIds,
      };
    }
    case flavorActionTypes.getFlavorType.success: {
      const flavors: Flavor[] = camelCaseArray(action.payload.items);

      const myflavorIds: TId[] = flavors.map((flavor: Flavor) => flavor.id);

      return {
        ...newState(state, flavors, action.payload),
        myflavorIds,
      };
    }

    case flavorActionTypes.getFlavorById.success: {
      const payload: Flavor = action.payload;

      const flavor = camelCaseObject(payload);

      return { ...state, ...newState(state, [flavor]) };
    }

    default:
      return state;
  }
};

export default flavorsReducer;
