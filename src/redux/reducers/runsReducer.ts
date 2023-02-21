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
  graphForRunId: any;
  paginated: any;
}

type PipelinesPayload = {
  id: TId;

  pipeline_runs: TRun[];
}[];

type RunPayload = TRun;

type WorkspacePayload = {
  id: TId;
  workspaceName: TId;
  pipeline_runs: TRun[];
};

export type Action = {
  type: string;
  payload: any;
  requestParams?: {
    pipelineId: TId;
    stackId: TId;
    stackComponentId: TId;
    runId: TId;
  };
};

export const initialState: State = {
  ids: [],
  byId: {},
  byPipelineId: {},
  byStackId: {},
  byStackComponentId: {},
  myRunIds: [],
  graphForRunId: {},
  paginated: {},
};

const newState = (state: State, runs: TRun[], pagination?: any): State => ({
  ...state,
  ids: idsInsert(state.ids, runs),
  byId: byKeyInsert(state.byId, runs),
  paginated: {
    index: pagination?.index,
    max_size: pagination?.max_size,
    totalPages: pagination?.total_pages,
    totalitem: pagination?.total,
  },
});
const newStateForGraph = (state: State, graph: any): State => ({
  ...state,
  graphForRunId: graph,
});

const runsReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case runActionTypes.getAllRuns.success: {
      const payload = action.payload.items;

      let allRuns: TRun[] = payload;

      const runs: TRun[] = camelCaseArray(allRuns);

      const myRunIds: TId[] = runs.map((run: TRun) => run.id);

      return { ...newState(state, runs, action.payload), myRunIds };
    }

    case runActionTypes.getGraphForRunId.success: {
      const payload = action.payload;

      const graphFromRun = {
        ...payload,

        runId: action?.requestParams?.runId,
      };

      const graph: any = camelCaseObject(graphFromRun);

      return {
        ...newStateForGraph(state, graph),
      };
    }
    case runActionTypes.getRunForId.success: {
      const payload: RunPayload = action.payload;

      if (!action.requestParams) return state;

      const run = camelCaseObject({
        ...payload,
        pipelineId: action.requestParams.pipelineId,
      });

      return { ...state, ...newState(state, [run]) };
    }

    case pipelineActionTypes.getRunsByPipelineId.success: {
      const payload = action.payload.items;
      const id = action?.requestParams?.pipelineId;

      const runsFromPipeline = payload.map((run: TRun) => ({
        ...run,

        pipelineId: action?.requestParams?.pipelineId,
      }));

      const runs: TRun[] = camelCaseArray(runsFromPipeline);
      const myRunIds: TId[] = runs.map((run: TRun) => run.id);

      const byPipelineId: Record<TId, TId[]> = { ...state.byPipelineId };

      byPipelineId[id as TId] = runs.map((run: TRun) => run.id);

      return {
        ...state,
        ...newState(state, runs, action.payload),
        myRunIds,
        byPipelineId,
      };
    }
    case stackActionTypes.getRunsByStackId.success: {
      const payload = action.payload.items;
      const id = action?.requestParams?.stackId;
      const runsFromStack = payload.map((run: TRun) => ({
        ...run,

        stackId: id,
      }));

      const runs: TRun[] = camelCaseArray(runsFromStack);
      const myRunIds: TId[] = runs.map((run: TRun) => run.id);

      const byStackId: Record<TId, TId[]> = {
        ...state.byStackId,
      };

      byStackId[id as TId] = runs.map((run: TRun) => run.id);
      return {
        ...state,
        ...newState(state, runs, action.payload),
        myRunIds,
        byStackId,
      };
    }
    case stackComponentActionTypes.getRunsByStackComponentId.success: {
      const payload = action.payload.items;

      const id = action?.requestParams?.stackComponentId;
      const runsFromStackComponent = payload.map((run: TRun) => ({
        ...run,
        stackComponentId: id,
      }));

      const runs: TRun[] = camelCaseArray(runsFromStackComponent);
      const myRunIds: TId[] = runs.map((run: TRun) => run.id);

      const byStackComponentId: Record<TId, TId[]> = {
        ...state.byStackComponentId,
      };

      byStackComponentId[id as TId] = runs.map((run: TRun) => run.id);
      return {
        ...state,
        ...newState(state, runs, action.payload),
        myRunIds,
        byStackComponentId,
      };
    }

    default:
      return state;
  }
};

export default runsReducer;
