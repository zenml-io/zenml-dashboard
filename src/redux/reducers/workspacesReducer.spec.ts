import workspacesReducer from './workspacesReducer';
import { workspaceActionTypes } from '../actionTypes';

const workspace = {
  id: '1245',
  name: 'workspace',
} as TWorkspace;

const getMyWorkspacesSuccessful = (
  currentState: any,
  payload: TWorkspace[] = [workspace],
): any => {
  const action = {
    type: workspaceActionTypes.getMyWorkspaces.success,
    payload,
  };

  const nextState = workspacesReducer(currentState, action);
  return { nextState };
};

const testStateAfterSuccessfulMyWorkspacesFetch = (state: {
  ids: TId[];
  byId: Record<TId, TWorkspace>;
  myWorkspaceIds: TId[];
}): void => {
  const { nextState } = getMyWorkspacesSuccessful(state);
  it('ids is added to the store', () => {
    expect(nextState.ids).toEqual(['other-id', workspace.id]);
  });

  it('byIds is added to the store', () => {
    const byId = {
      [workspace.id]: workspace,
      ['other-id']: workspace,
    };
    expect(nextState.byId).toEqual(byId);
  });

  it('myOrganizationId added to the store', () => {
    expect(nextState.myWorkspaceIds).toEqual([workspace.id]);
  });
};

describe('given a successful getMyWorkspaces action', () => {
  describe('The store has data, adds the workspaces', () => {
    const byId = {
      ['other-id']: workspace,
    };
    const ids = ['other-id'];
    testStateAfterSuccessfulMyWorkspacesFetch({
      byId,
      ids,
      myWorkspaceIds: ['other-id'],
    });
  });
});
