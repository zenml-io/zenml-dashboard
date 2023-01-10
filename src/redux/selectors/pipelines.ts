import _ from 'lodash';
import { Selector } from 'reselect';

import { State } from '../reducers/pipelinesReducer';
import { createSelector } from './createSelector';
import { extractItemFromById } from './utils';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.pipelines') || {};

const getById = (state: State): Record<TId, TPipeline> =>
  _.get(stateKey(state), 'byId');

const getMyPipelineIds = (state: State): TId[] =>
  _.get(stateKey(state), 'myPipelineIds');

const getMyPiplinesPaginated = (state: State): any =>
  _.get(stateKey(state), 'paginated');

export const myPipelines = (state?: State | null): TPipeline[] => {
  if (!state) return [];
  const myPipelineIds = getMyPipelineIds(state);
  const byId = getById(state);

  return (myPipelineIds || []).reduce((current: TPipeline[], id: TId) => {
    const pipeline = byId[id];

    if (pipeline) {
      current = [...current, pipeline];
    }

    return current;
  }, [] as TPipeline[]);
};

export const myPipelinesPaginated = (state?: State | null): any => {
  if (!state) return {};
  const paginated = getMyPiplinesPaginated(state);

  return paginated;
};

export const pipelineForId = (pipelineId: TId): Selector<any, TPipeline> =>
  createSelector(getById, extractItemFromById(pipelineId));

const pipelineSelectors = {
  myPipelinesPaginated: myPipelinesPaginated,
  myPipelines: myPipelines,
  pipelineForId,
};

export { pipelineSelectors };
