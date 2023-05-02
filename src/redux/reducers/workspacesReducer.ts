import { DEFAULT_WORKSPACE_NAME } from '../../constants';
import { camelCaseArray } from '../../utils/camelCase';
import { workspaceActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, Workspaces>;
  myWorkspaceIds: TId[];
  selectedWorkspace: string;
  workspaceStats: any;
}

type WorkspacesPayload = Workspaces[];

type WorkspacePayload = Workspaces;

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
  workspaces: Workspaces[],
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
      const workspaces: Workspaces[] = camelCaseArray(
        action.payload.items as WorkspacesPayload,
      );

      const myWorkspaceIds: TId[] = workspaces.map(
        (workspace: Workspaces) => workspace.id,
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
        (workspace: Workspaces) => workspace.id,
      );

      return {
        ...newState(state, allWorkspaces, seletecdWorkspace),
        myWorkspaceIds,
      };
    }

    case workspaceActionTypes.getMyWorkspaceStats.success: {
      // const { workspaceStats } = action.payload as any;
      const workspaceStats = action.payload.items;

      return { ...newState(state, workspaceStats) };
    }

    default:
      return state;
  }
};

export default workspacesReducer;
