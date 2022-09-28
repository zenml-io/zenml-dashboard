import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import {
  pipelineActionTypes,
  runActionTypes,
  stackComponentActionTypes,
  stackActionTypes,
} from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, TRun>;
  byPipelineId: Record<TId, TId[]>;
  byStackId: Record<TId, TId[]>;
  byStackComponentId: Record<TId, TId[]>;
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
  projectName: TId;
  pipeline_runs: TRun[];
};

export type Action = {
  type: string;
  payload: any;
  requestParams?: {
    workspaceId: TId;
    pipelineId: TId;
    stackId: TId;
  };
};

export const initialState: State = {
  ids: [],
  byId: {},
  byPipelineId: {},
  byStackId: {},
  byStackComponentId: {},
  myRunIds: [],
};

const newState = (state: State, runs: TRun[]): State => ({
  ...state,
  ids: idsInsert(state.ids, runs),
  byId: byKeyInsert(state.byId, runs),
});

const runsReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case runActionTypes.getAllRuns.success: {
      return { ...state };
    }
    // case pipelineActionTypes.getMyPipelines.success:
    // case workspaceActionTypes.getPipelinesForWorkspaceId.success: {
    //   const payload: PipelinesPayload = action.payload;

    //   const byPipelineId: Record<TId, TId[]> = {};
    //   let pipelineRuns: TRun[] = [];

    //   payload.forEach(
    //     (pipeline: { id: TId; pipeline_runs: TRun[]; workspace_id: TId }) => {
    //       // byPipelineId[pipeline.id] = pipeline.pipeline_runs.map(
    //       //   (run: TRun) => run.id,
    //       // );
    //       byPipelineId[pipeline.id] = (pipeline.pipeline_runs || []).map(
    //         (run: TRun) => run.id,
    //       );

    //       const runsFromPipeline = (pipeline.pipeline_runs || []).map(
    //         (run: TRun) => ({
    //           ...run,
    //           workspaceId: pipeline.workspace_id,
    //           pipelineId: pipeline.id,
    //         }),
    //       );

    //       pipelineRuns = [...pipelineRuns, ...runsFromPipeline];
    //     },
    //   );

    //   const runs: TRun[] = camelCaseArray(pipelineRuns);

    //   const myRunIds: TId[] = runs.map((run: TRun) => run.id);

    //   return { ...newState(state, runs), myRunIds, byPipelineId };
    // }
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

    // case pipelineActionTypes.getPipelineForId.success: {
    //   const payload: PipelinePayload = action.payload;

    //   const runsFromPipeline = (payload.pipeline_runs || []).map(
    //     (run: TRun) => ({
    //       ...run,
    //       projectName: payload.projectName,
    //       pipelineId: payload.id,
    //     }),
    //   );

    //   const runs: TRun[] = camelCaseArray(runsFromPipeline);

    //   const byPipelineId: Record<TId, TId[]> = { ...state.byPipelineId };

    //   byPipelineId[payload.id] = runs.map((run: TRun) => run.id);

    //   const temp = { ...state, ...newState(state, runs), byPipelineId };
    //   return temp;
    // }
    case pipelineActionTypes.getRunsByPipelineId.success: {
      const payload = action.payload;
      const id = action?.requestParams?.pipelineId;

      const runsFromPipeline = payload.map((run: TRun) => ({
        ...run,
        // projectName: payload.projectName,
        pipelineId: action?.requestParams?.pipelineId,
      }));

      const runs: TRun[] = camelCaseArray(runsFromPipeline);
      const myRunIds: TId[] = runs.map((run: TRun) => run.id);

      const byPipelineId: Record<TId, TId[]> = { ...state.byPipelineId };

      byPipelineId[id as TId] = runs.map((run: TRun) => run.id);
      return {
        ...state,
        ...newState(state, runs),
        myRunIds,
        byPipelineId,
      };
    }
    case stackActionTypes.getRunsByStackId.success: {
      const payload = action.payload;
      const id = action?.requestParams?.stackId;
      const runsFromStack = payload.map((run: TRun) => ({
        ...run,
        // projectName: payload.projectName,
        stackId: id,
      }));

      const runs: TRun[] = camelCaseArray(runsFromStack);
      const myRunIds: TId[] = runs.map((run: TRun) => run.id);

      const byStackId: Record<TId, TId[]> = {
        ...state.byStackId,
      };
      // debugger;
      byStackId[id as TId] = runs.map((run: TRun) => run.id);
      return {
        ...state,
        ...newState(state, runs),
        myRunIds,
        byStackId,
      };
    }
    case stackComponentActionTypes.getRunsByStackComponentId.success: {
      const payload = action.payload;

      const runsFromStackComponent = payload.runsByStackComponent.map(
        (run: TRun) => ({
          ...run,
          // projectName: payload.projectName,
          stackComponentId: payload.stackcomponentId,
        }),
      );

      const runs: TRun[] = camelCaseArray(runsFromStackComponent);
      const myRunIds: TId[] = runs.map((run: TRun) => run.id);

      const byStackComponentId: Record<TId, TId[]> = {
        ...state.byStackComponentId,
      };

      byStackComponentId[payload.stackComponentId] = runs.map(
        (run: TRun) => run.id,
      );
      return {
        ...state,
        ...newState(state, runs),
        myRunIds,
        byStackComponentId,
      };
    }

    default:
      return state;
  }
};

export default runsReducer;
