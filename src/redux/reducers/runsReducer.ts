import { camelCaseArray, camelCaseObject } from '../../utils/camelCase';
import { compareObjects } from '../../utils/compareObjects';
import {
  pipelineActionTypes,
  runActionTypes,
  stackComponentActionTypes,
  stackActionTypes,
  repositoryActionTypes,
} from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, TRun>;
  byPipelineId: Record<TId, TId[]>;
  byStackId: Record<TId, TId[]>;
  byStackComponentId: Record<TId, TId[]>;
  byRepositoryId: Record<TId, TId[]>;
  myRunIds: TId[];
  graphForRunId: any;
  paginated: any;
  artifactData: any;
  artifactVisualization: any;
  stepData: any;
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
    repositoryID: TId;
  };
};

export const initialState: State = {
  ids: [],
  byId: {},
  byPipelineId: {},
  byStackId: {},
  byStackComponentId: {},
  byRepositoryId: {},
  myRunIds: [],
  graphForRunId: {},
  paginated: {},
  artifactData: {},
  artifactVisualization: {},
  stepData: {},
};

const newState = (state: State, runs: TRun[], pagination?: any): State => ({
  ...state,
  ids: idsInsert(state.ids, runs),
  byId: byKeyInsert(state.byId, runs),
  paginated: {
    page: pagination?.index,
    size: pagination?.max_size,
    totalPages: pagination?.total_pages,
    totalitem: pagination?.total,
  },
});
const newStateForGraph = (state: State, graph: any): State => ({
  ...state,
  graphForRunId: graph,
});
const newArtifactState = (state: State, artifactData?: any): State => ({
  ...state,
  artifactData: artifactData,
});
const newArtifactVisualizationState = (
  state: State,
  artifactVisualization?: any,
): State => ({
  ...state,
  artifactVisualization: artifactVisualization,
});
const newStepState = (state: State, stepData?: any): State => ({
  ...state,
  stepData: stepData,
});

const runsReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case runActionTypes.getArtifactVisualization.success: {
      const artifactVisualization = action.payload;
      return { ...newArtifactVisualizationState(state, artifactVisualization) };
    }

    case runActionTypes.getArtifact.success: {
      const artifact = action.payload;
      return { ...newArtifactState(state, artifact) };
    }

    case runActionTypes.getStep.success: {
      const step = action.payload;
      return { ...newStepState(state, step) };
    }

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

      const previousGraph = state?.graphForRunId;
      // debugger;
      if (previousGraph && Object.keys(previousGraph).length) {
        const removePropertiesFromNodes = (nodes: any) => {
          return nodes.map((node: any) => {
            if (node) {
              const newNode = { ...node };
              delete newNode.position;
              delete newNode.sourcePosition;
              delete newNode.targetPosition;
              return newNode;
            }
            return node;
          });
        };

        // Function to remove properties from edges
        const removePropertiesFromEdges = (edges: any) => {
          return edges.map((edge: any) => {
            if (edge) {
              const newEdge = { ...edge };
              delete newEdge.markerEnd;
              delete newEdge.type;
              return newEdge;
            }
            return edge;
          });
        };

        // Update nodes and edges with removed properties
        previousGraph.nodes = removePropertiesFromNodes(
          state.graphForRunId.nodes,
        );
        previousGraph.edges = removePropertiesFromEdges(
          state.graphForRunId.edges,
        );
      }

      const graph: any = camelCaseObject(graphFromRun);
      const isEqual = compareObjects(previousGraph, graph);

      if (isEqual) {
        return state;
      } else {
        return {
          ...newStateForGraph(state, graph),
        };
      }
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

    case repositoryActionTypes.getRunsByRepoID.success: {
      const payload = action.payload.items;

      const id = action?.requestParams?.repositoryID;
      const runsFromRepository = payload.map((run: TRun) => ({
        ...run,
        repositoryId: id,
      }));

      const runs: TRun[] = camelCaseArray(runsFromRepository);
      const myRunIds: TId[] = runs.map((run: TRun) => run.id);

      const byRepositoryId: Record<TId, TId[]> = {
        ...state.byRepositoryId,
      };

      byRepositoryId[id as TId] = runs.map((run: TRun) => run.id);
      return {
        ...state,
        ...newState(state, runs, action.payload),
        myRunIds,
        byRepositoryId,
      };
    }

    default:
      return state;
  }
};

export default runsReducer;
