import { DEFAULT_PROJECT_NAME } from '../../constants';
import { camelCaseArray } from '../../utils/camelCase';
import { projectActionTypes } from '../actionTypes';
import { byKeyInsert, idsInsert } from './reducerHelpers';

export interface State {
  ids: TId[];
  byId: Record<TId, Projects>;
  myProjectIds: TId[];
  selectedProject: string;
  projectStats: any;
}

type ProjectsPayload = Projects[];

type ProjectPayload = Projects;

export type Action = {
  requestParams: any;
  type: string;
  payload: any;
};

export const initialState: State = {
  ids: [],
  byId: {},
  myProjectIds: [],
  selectedProject: '',
  projectStats: {},
};

const newState = (
  state: State,
  projects: Projects[],
  defaultSelectedProject?: string,
  projectStats?: object,
): State => ({
  ...state,
  ids: idsInsert(state.ids, projects),
  byId: byKeyInsert(state.byId, projects),
  selectedProject: defaultSelectedProject as string,
  projectStats: projectStats,
});

const projectsReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case projectActionTypes.getMyProjects.success: {
      const projects: Projects[] = camelCaseArray(
        action.payload as ProjectsPayload,
      );

      const myProjectIds: TId[] = projects.map(
        (project: Projects) => project.id,
      );
      if (action.requestParams.selectDefault === undefined) {
        const defaultSelectedProject = DEFAULT_PROJECT_NAME;
        return {
          ...newState(state, projects, defaultSelectedProject),
          myProjectIds,
        };
      } else {
        return {
          ...newState(state, projects, action.requestParams.selectedProject),
          myProjectIds,
        };
      }
    }
    case projectActionTypes.selectProject.success: {
      const { seletecdProject, allProjects } = action.payload as any;

      const myProjectIds: TId[] = allProjects.map(
        (project: Projects) => project.id,
      );

      return {
        ...newState(state, allProjects, seletecdProject),
        myProjectIds,
      };
    }

    case projectActionTypes.getMyProjectStats.success: {
      // const { projectStats } = action.payload as any;
      const projectStats = action.payload;

      return { ...newState(state, projectStats) };
    }

    default:
      return state;
  }
};

export default projectsReducer;
