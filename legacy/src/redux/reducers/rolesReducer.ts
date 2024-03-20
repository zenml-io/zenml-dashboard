import { camelCaseArray } from '../../utils/camelCase';
import { rolesActionTypes } from '../actionTypes';

export interface State {
  roles: Roles[];
}

type RolesPayload = Roles[];

export type Action = {
  type: string;
  payload: any;
};

export const initialState: State = {
  roles: [],
};

const newState = (roles: Roles[]): State => ({
  roles,
});

const rolesReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case rolesActionTypes.getRoles.success: {
      const roles: Roles[] = camelCaseArray(
        action.payload?.items as RolesPayload,
      );

      return { ...newState(roles) };
    }

    default:
      return state;
  }
};

export default rolesReducer;
