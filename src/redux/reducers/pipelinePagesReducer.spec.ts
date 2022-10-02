import { pipelinePagesActionTypes } from '../actionTypes';
import pipelinePagesReducer, { initialState } from './pipelinePagesReducer';

describe(pipelinePagesActionTypes.setCurrentWorkspace, () => {
  const workspace = {
    id: 'id',
  };

  const action = {
    type: pipelinePagesActionTypes.setCurrentWorkspace,
    payload: {
      workspace,
    },
  } as any;

  const nextState = pipelinePagesReducer(initialState, action);

  it('adds the currentWorkspace to the state', () => {
    expect(nextState).toEqual({ ...initialState, currentWorkspace: workspace });
  });
});

describe(pipelinePagesActionTypes.setSelectedRunIds, () => {
  const runIds = ['id'];

  const action = {
    type: pipelinePagesActionTypes.setSelectedRunIds,
    payload: {
      runIds,
    },
  } as any;

  const nextState = pipelinePagesReducer(initialState, action);

  it('adds the selectedRunIds to the state', () => {
    expect(nextState).toEqual({ ...initialState, selectedRunIds: runIds });
  });
});

describe(pipelinePagesActionTypes.setFetching, () => {
  const fetching = true;

  const action = {
    type: pipelinePagesActionTypes.setFetching,
    payload: {
      fetching,
    },
  } as any;

  const nextState = pipelinePagesReducer(initialState, action);

  it('adds the fetching to the state', () => {
    expect(nextState).toEqual({ ...initialState, fetching });
  });
});
