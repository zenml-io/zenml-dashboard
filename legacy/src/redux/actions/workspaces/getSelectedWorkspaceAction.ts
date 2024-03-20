import { workspaceActionTypes } from '../../actionTypes';

export const getSelectedWorkspaceAction = ({
  allWorkspaces,
  seletecdWorkspace,
}: {
  allWorkspaces: any;
  seletecdWorkspace: any;
  onSuccess?: () => void;
  onFailure?: () => void;
}): any => ({
  type: workspaceActionTypes.selectWorkspace.success,
  payload: {
    allWorkspaces,
    seletecdWorkspace,
    isAuthenticated: true,
  },
});
