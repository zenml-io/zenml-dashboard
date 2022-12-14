import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import { pipelineActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, TPipeline>;
  myPipelineIds: TId[];
}

type PipelinesPayload = TPipeline[];

type PipelinePayload = TPipeline;

export type Action = {
  type: string;
  payload: any;
};

export const initialState: State = {
  ids: [],
  byId: {},
  myPipelineIds: [],
};

const newState = (state: State, pipelines: TPipeline[]): State => ({
  ...state,
  ids: idsInsert(state.ids, pipelines),
  byId: byKeyInsert(state.byId, pipelines),
});

const pipelinesReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case pipelineActionTypes.getMyPipelines.success: {
      const pipelines: TPipeline[] = camelCaseArray(
        action.payload as PipelinesPayload,
      );

      const myPipelineIds: TId[] = pipelines.map(
        (pipeline: TPipeline) => pipeline.id,
      );

      return { ...newState(state, pipelines), myPipelineIds };
    }

    case pipelineActionTypes.getPipelineForId.success: {
      const payload: PipelinePayload = action.payload;

      const pipeline = camelCaseObject(payload);

      return { ...state, ...newState(state, [pipeline]) };
    }

    default:
      return state;
  }
};

export default pipelinesReducer;
