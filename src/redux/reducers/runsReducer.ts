import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import {
  pipelineActionTypes,
  workspaceActionTypes,
  runActionTypes,
} from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, TRun>;
  byPipelineId: Record<TId, TId[]>;
  myRunIds: TId[];
}

type PipelinesPayload = {
  id: TId;
  workspace_id: TId;
  pipeline_runs: TRun[];
}[];

type RunPayload = TRun;

type PipelinePayload = {
  id: TId;
  workspace_id: TId;
  pipeline_runs: TRun[];
};

export type Action = {
  type: string;
  payload: any;
  requestParams?: {
    workspaceId: TId;
    pipelineId: TId;
  };
};

export const initialState: State = {
  ids: [],
  byId: {},
  byPipelineId: {},
  myRunIds: [],
};

const newState = (state: State, runs: TRun[]): State => ({
  ...state,
  ids: idsInsert(state.ids, runs),
  byId: byKeyInsert(state.byId, runs),
});

const runsReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case pipelineActionTypes.getMyPipelines.success:
    case workspaceActionTypes.getPipelinesForWorkspaceId.success: {
      const payload: PipelinesPayload = action.payload;

      const byPipelineId: Record<TId, TId[]> = {};
      let pipelineRuns: TRun[] = [];

      payload.forEach(
        (pipeline: { id: TId; pipeline_runs: TRun[]; workspace_id: TId }) => {
          byPipelineId[pipeline.id] = pipeline.pipeline_runs.map(
            (run: TRun) => run.id,
          );

          const runsFromPipeline = pipeline.pipeline_runs.map((run: TRun) => ({
            ...run,
            workspaceId: pipeline.workspace_id,
            pipelineId: pipeline.id,
          }));

          pipelineRuns = [...pipelineRuns, ...runsFromPipeline];
        },
      );

      const runs: TRun[] = camelCaseArray(pipelineRuns);

      const myRunIds: TId[] = runs.map((run: TRun) => run.id);

      return { ...newState(state, runs), myRunIds, byPipelineId };
    }

    case runActionTypes.getRunForId.success: {
      const payload: RunPayload = action.payload;

      if (!action.requestParams) return state;

      const run = camelCaseObject({
        ...payload,
        pipelineId: action.requestParams.pipelineId,
      });

      if (action.requestParams.workspaceId) {
        run.workspaceId = action.requestParams.workspaceId;
      }

      return { ...state, ...newState(state, [run]) };
    }

    case pipelineActionTypes.getPipelineForId.success: {
      const payload: PipelinePayload = action.payload;

      const runsFromPipeline = payload.pipeline_runs.map((run: TRun) => ({
        ...run,
        workspaceId: payload.workspace_id,
        pipelineId: payload.id,
      }));

      const runs: TRun[] = camelCaseArray(runsFromPipeline);

      const byPipelineId: Record<TId, TId[]> = { ...state.byPipelineId };

      byPipelineId[payload.id] = runs.map((run: TRun) => run.id);

      return { ...state, ...newState(state, runs), byPipelineId };
    }

    default:
      return state;
  }
};

export default runsReducer;
