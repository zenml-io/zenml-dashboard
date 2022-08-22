import { workspaceActionTypes } from './workspaces';

import { actionTypes } from './constants';
import { testHelperForActionTypes } from './testUtils/testHelperForActionTypes';

testHelperForActionTypes({
  types: workspaceActionTypes.getMyWorkspaces,
  actionType: actionTypes.WORKSPACES_GET_MY_WORKSPACES,
});

testHelperForActionTypes({
  types: workspaceActionTypes.getPipelinesForWorkspaceId,
  actionType: actionTypes.WORKSPACES_GET_PIPELINES_FOR_WORKSPACE_ID,
});
