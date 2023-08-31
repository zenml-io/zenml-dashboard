import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import { pipelineActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';
import { Pipeline } from '../../api/types';

export interface State {
  ids: TId[];
  byId: Record<TId, Pipeline>;
  myPipelineIds: TId[];
  paginated: any;
}

export type Action = {
  type: string;
  payload: any;
};

export const initialState: State = {
  ids: [],
  byId: {},
  myPipelineIds: [],
  paginated: {},
};

const newState = (
  state: State,
  pipelines: Pipeline[],
  pagination?: any,
): State => ({
  ...state,
  ids: idsInsert(state.ids, pipelines),
  byId: byKeyInsert(state.byId, pipelines),
  paginated: {
    page: pagination?.index,
    size: pagination?.max_size,
    totalPages: pagination?.total_pages,
    totalitem: pagination?.total,
  },
});

const pipelinesReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case pipelineActionTypes.getMyPipelines.success: {
      const pipelines: Pipeline[] = camelCaseArray(action.payload.items);

      const myPipelineIds: TId[] = pipelines.map(
        (pipeline: Pipeline) => pipeline.id,
      );

      return { ...newState(state, pipelines, action.payload), myPipelineIds };
    }

    case pipelineActionTypes.getPipelineForId.success: {
      const payload: Pipeline = action.payload;

      const pipeline = camelCaseObject(payload);

      return { ...state, ...newState(state, [pipeline]) };
    }

    default:
      return state;
  }
};

export default pipelinesReducer;
