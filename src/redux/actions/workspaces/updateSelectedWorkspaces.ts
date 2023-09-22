import { workspaceActionTypes } from '../../actionTypes';

export const updateAccessTokenAction = ({
  workspace,
}: {
  workspace: string;
}) => ({
  type: workspaceActionTypes.updateSelectedWorkspace,
  payload: {
    workspace,
  },
});
