import runsReducer from './runsReducer';
import { pipelineActionTypes } from '../actionTypes';
import { runActionTypes } from '../actionTypes/runs';

const run = {
  id: '1245',
} as TRun;

const pipelineId = 'pipelineId';
const workspaceId = 'workspaceId';

const actionPayload = [
  {
    id: pipelineId,
    workspace_id: workspaceId,
    pipeline_runs: [run],
  },
];

const getMyPipelinesSuccessful = (
  currentState: any,
  payload: any = actionPayload,
): any => {
  const action = {
    type: pipelineActionTypes.getMyPipelines.success,
    payload,
  };

  const nextState = runsReducer(currentState, action);
  return { nextState };
};

const testStateAfterSuccessfulMyPipelinesFetch = (state: {
  ids: TId[];
  byId: Record<TId, TRun>;
  myRunIds: TId[];
}): void => {
  const { nextState } = getMyPipelinesSuccessful(state);
  it('ids is added to the store', () => {
    expect(nextState.ids).toEqual(['other-id', run.id]);
  });

  it('byIds is added to the store', () => {
    const byId = {
      [run.id]: { ...run, workspaceId, pipelineId },
      ['other-id']: run,
    };
    expect(nextState.byId).toEqual(byId);
  });

  it('myRunIds added to the store', () => {
    expect(nextState.myRunIds).toEqual([run.id]);
  });
};

describe('given a successful getMyPipelines action', () => {
  describe('The store has data, adds the runs', () => {
    const byId = {
      ['other-id']: run,
    };
    const ids = ['other-id'];
    testStateAfterSuccessfulMyPipelinesFetch({
      byId,
      ids,
      myRunIds: ['other-id'],
    });
  });
});

const runForIdSuccessful = (currentState: any): any => {
  const action = {
    type: runActionTypes.getRunForId.success,
    payload: run,
    requestParams: {
      workspaceId,
      pipelineId,
    },
  };

  const nextState = runsReducer(currentState, action);
  return { nextState };
};

const testStateAfterSuccessfulRunForId = (state: {
  ids: never[] | string[];
  byId: { 'other-id': TRun };
}): void => {
  const { nextState } = runForIdSuccessful(state);
  it('ids is added to the store', () => {
    expect(nextState.ids).toEqual(['other-id', run.id]);
  });

  it('byIds is added to the store', () => {
    const byId = {
      [run.id]: { ...run, workspaceId, pipelineId },
      ['other-id']: run,
    };
    expect(nextState.byId).toEqual(byId);
  });
};

describe('given a successful run for id action', () => {
  describe('The store has data, replaces everything that was updated', () => {
    const byId = {
      ['other-id']: run,
    };
    const ids = ['other-id'];
    testStateAfterSuccessfulRunForId({
      byId,
      ids,
    });
  });
});

const pipelineForIdSuccessful = (currentState: any): any => {
  const action = {
    type: pipelineActionTypes.getPipelineForId.success,
    payload: {
      pipeline_runs: [run],
      id: pipelineId,
      workspace_id: workspaceId,
    },
  };

  const nextState = runsReducer(currentState, action);
  return { nextState };
};

const testStateAfterSuccessfulPipelineForId = (state: {
  ids: never[] | string[];
  byId: { 'other-id': TRun };
}): void => {
  const { nextState } = pipelineForIdSuccessful(state);
  it('ids is added to the store', () => {
    expect(nextState.ids).toEqual(['other-id', run.id]);
  });

  it('byIds is added to the store', () => {
    const byId = {
      [run.id]: { ...run, workspaceId, pipelineId },
      ['other-id']: run,
    };
    expect(nextState.byId).toEqual(byId);
  });
};

describe('given a successful pipeline for id action', () => {
  describe('The store has data, replaces everything that was updated', () => {
    const byId = {
      ['other-id']: run,
    };
    const ids = ['other-id'];
    testStateAfterSuccessfulPipelineForId({
      byId,
      ids,
    });
  });
});
