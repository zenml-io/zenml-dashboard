import { getMyWorkspacesAction } from './getMyWorkspacesAction';
import { getPipelinesByWorkspaceIdAction } from './getPipelinesByWorkspaceIdAction';

export const workspacesActions = {
  getMy: getMyWorkspacesAction,
  pipelinesForWorkspaceId: getPipelinesByWorkspaceIdAction,
};
