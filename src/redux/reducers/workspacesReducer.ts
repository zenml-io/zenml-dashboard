import { camelCaseArray } from '../../utils/camelCase';
import { workspaceActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, TWorkspace>;
  myWorkspaceIds: TId[];
}

export type Action = {
  type: string;
  payload: TWorkspace[];
};

export const initialState: State = {
  ids: [],
  byId: {},
  myWorkspaceIds: [],
};

const newState = (state: State, workspaces: TWorkspace[]): State => ({
  ...state,
  ids: idsInsert(state.ids, workspaces),
  byId: byKeyInsert(state.byId, workspaces),
});

const workspacesReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case workspaceActionTypes.getMyWorkspaces.success: {
      const workspaces: TWorkspace[] = camelCaseArray(action.payload);

      const myWorkspaceIds: TId[] = workspaces.map(
        (workspace: TWorkspace) => workspace.id,
      );

      return { ...newState(state, workspaces), myWorkspaceIds };
    }

    default:
      return state;
  }
};

export default workspacesReducer;
