import pipelinesReducer from './pipelinesReducer';
import { pipelineActionTypes, workspaceActionTypes } from '../actionTypes';

const pipeline = {
  id: '1245',
  name: 'pipeline',
} as TPipeline;

const getPipelinesSuccessful = (
  actionType: string,
  currentState: any,
  payload: TPipeline[] = [pipeline],
): any => {
  const action = {
    type: actionType,
    payload,
  };

  const nextState = pipelinesReducer(currentState, action);
  return { nextState };
};

const testStateAfterSuccessfulPipelinesFetch = (
  state: {
    ids: TId[];
    byId: Record<TId, TPipeline>;
    myPipelineIds: TId[];
  },
  actionType: string,
): void => {
  const { nextState } = getPipelinesSuccessful(actionType, state);
  it('ids is added to the store', () => {
    expect(nextState.ids).toEqual(['other-id', pipeline.id]);
  });

  it('byIds is added to the store', () => {
    const byId = {
      [pipeline.id]: pipeline,
      ['other-id']: pipeline,
    };
    expect(nextState.byId).toEqual(byId);
  });

  it('myPipelineIds added to the store', () => {
    expect(nextState.myPipelineIds).toEqual([pipeline.id]);
  });
};

describe('given a successful getMyPipelines action', () => {
  describe('The store has data, adds the pipelines', () => {
    const byId = {
      ['other-id']: pipeline,
    };
    const ids = ['other-id'];
    testStateAfterSuccessfulPipelinesFetch(
      {
        byId,
        ids,
        myPipelineIds: ['other-id'],
      },
      pipelineActionTypes.getMyPipelines.success,
    );
  });
});

describe('given a successful getPipelinesForWorkspaceId action', () => {
  describe('The store has data, adds the pipelines', () => {
    const byId = {
      ['other-id']: pipeline,
    };
    const ids = ['other-id'];
    testStateAfterSuccessfulPipelinesFetch(
      {
        byId,
        ids,
        myPipelineIds: ['other-id'],
      },
      workspaceActionTypes.getPipelinesForWorkspaceId.success,
    );
  });
});

const pipelineForIdSuccessful = (currentState: any): any => {
  const action = {
    type: pipelineActionTypes.getPipelineForId.success,
    payload: pipeline,
  };

  const nextState = pipelinesReducer(currentState, action);
  return { nextState };
};

const testStateAfterSuccessfulPipelineForId = (state: {
  ids: never[] | string[];
  byId: { 'other-id': TPipeline };
}): void => {
  const { nextState } = pipelineForIdSuccessful(state);
  it('ids is added to the store', () => {
    expect(nextState.ids).toEqual(['other-id', pipeline.id]);
  });

  it('byIds is added to the store', () => {
    const byId = {
      [pipeline.id]: pipeline,
      ['other-id']: pipeline,
    };
    expect(nextState.byId).toEqual(byId);
  });
};

describe('given a successful pipeline for id action', () => {
  describe('The store has data, replaces everything that was updated', () => {
    const byId = {
      ['other-id']: pipeline,
    };
    const ids = ['other-id'];
    testStateAfterSuccessfulPipelineForId({
      byId,
      ids,
    });
  });
});
