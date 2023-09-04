import { Workspace } from '../../api/types';
import { DEFAULT_WORKSPACE_NAME } from '../../constants';
import { camelCaseArray } from '../../utils/camelCase';
import { workspaceActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, Workspace>;
  myWorkspaceIds: TId[];
  selectedWorkspace: string;
  workspaceStats: any;
}

export type Action = {
  requestParams: any;
  type: string;
  payload: any;
};

export const initialState: State = {
  ids: [],
  byId: {},
  myWorkspaceIds: [],
  selectedWorkspace: '',
  workspaceStats: {},
};

const newState = (
  state: State,
  workspaces: Workspace[],
  defaultSelectedWorkspace?: string,
  workspaceStats?: object,
): State => ({
  ...state,
  ids: idsInsert(state.ids, workspaces),
  byId: byKeyInsert(state.byId, workspaces),
  selectedWorkspace: defaultSelectedWorkspace as string,
  workspaceStats: workspaceStats,
});

const workspacesReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case workspaceActionTypes.getMyWorkspaces.success: {
      const workspaces: Workspace[] = camelCaseArray(action.payload.items);

      const myWorkspaceIds: TId[] = workspaces.map(
        (workspace: Workspace) => workspace.id,
      );
      if (action.requestParams.selectDefault === undefined) {
        const defaultSelectedWorkspace = DEFAULT_WORKSPACE_NAME;
        return {
          ...newState(state, workspaces, defaultSelectedWorkspace),
          myWorkspaceIds,
        };
      } else {
        return {
          ...newState(
            state,
            workspaces,
            action.requestParams.selectedWorkspace,
          ),
          myWorkspaceIds,
        };
      }
    }
    case workspaceActionTypes.selectWorkspace.success: {
      const { seletecdWorkspace, allWorkspaces } = action.payload as any;

      const myWorkspaceIds: TId[] = allWorkspaces.map(
        (workspace: Workspace) => workspace.id,
      );

      return {
        ...newState(state, allWorkspaces, seletecdWorkspace),
        myWorkspaceIds,
      };
    }

    case workspaceActionTypes.getMyWorkspaceStats.success: {
      const workspaceStats = action.payload.items;

      return { ...newState(state, workspaceStats) };
    }

    default:
      return state;
  }
};

export default workspacesReducer;
