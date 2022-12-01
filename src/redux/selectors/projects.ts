import _ from 'lodash';

import { State } from '../reducers/projectsReducer';

const stateKey = (state: State): State =>
  _.get(state, 'persisted.projects') || {};

const getById = (state: State): Record<TId, Projects> =>
  _.get(stateKey(state), 'byId');

const getMyProjectIds = (state: State): TId[] =>
  _.get(stateKey(state), 'myProjectIds');

const getSelectedProjectIds = (state: State): string =>
  _.get(stateKey(state), 'selectedProject');

export const myProjects = (state?: State | null): Projects[] => {
  if (!state) return [];
  const myProjectIds = getMyProjectIds(state);
  const byId = getById(state);

  return (myProjectIds || []).reduce((current: Projects[], id: TId) => {
    const project = byId[id];

    if (project) {
      current = [...current, project];
    }

    return current;
  }, [] as Projects[]);
};
export const selectedProject = (state?: State | null): string => {
  if (!state) return '';
  const project = getSelectedProjectIds(state);
  return project;
};

const projectSelectors = {
  myProjects: myProjects,
  selectedProject: selectedProject,
};

export { projectSelectors };
