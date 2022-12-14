import { combineReducers } from 'redux';
import { ACCOUNT_LOGOUT } from './actionTypes';

import sessionReducer, {
  initialState as sessionInitialState,
} from './reducers/sessionReducer';

import usersReducer, {
  initialState as usersInitialState,
} from './reducers/usersReducer';

import organizationsReducer, {
  initialState as organizationsInitialState,
} from './reducers/organizationsReducer';
import projectsReducer, {
  initialState as projectsInitialState,
} from './reducers/projectsReducer';
import pipelinesReducer, {
  initialState as pipelinesInitialState,
} from './reducers/pipelinesReducer';

import stacksReducer, {
  initialState as stacksInitialState,
} from './reducers/stacksReducer';

import rolesReducer, {
  initialState as rolesInitialState,
} from './reducers/rolesReducer';

import stackComponentsReducer, {
  initialState as stackComponentsInitialState,
} from './reducers/stackComponentsReducer';

import runsReducer, {
  initialState as runsInitialState,
} from './reducers/runsReducer';

import pipelinePagesReducer, {
  initialState as pipelinePagesInitialState,
} from './reducers/pipelinePagesReducer';

import runPagesReducer, {
  initialState as runPagesInitialState,
} from './reducers/runPagesReducer';

import stackPagesReducer, {
  initialState as stackPagesInitialState,
} from './reducers/stackPagesReducer';

const initialState = {
  session: sessionInitialState,
  users: usersInitialState,
  organizations: organizationsInitialState,
  pipelines: pipelinesInitialState,
  projects: projectsInitialState,
  stacks: stacksInitialState,
  stackComponents: stackComponentsInitialState,
  runs: runsInitialState,
  roles: rolesInitialState,
  runPages: runPagesInitialState,
  pipelinePages: pipelinePagesInitialState,
  stacksPages: stackPagesInitialState,
};

export const persisted = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  roles: rolesReducer,
  organizations: organizationsReducer,
  projects: projectsReducer,
  pipelines: pipelinesReducer,
  stacks: stacksReducer,
  stackComponents: stackComponentsReducer,
  runs: runsReducer,
  runPages: runPagesReducer,
  pipelinePages: pipelinePagesReducer,
  stackPages: stackPagesReducer,
});

export default (state: any, action: any) => {
  if (action.type === ACCOUNT_LOGOUT) {
    return persisted(initialState as any, action);
  }

  return persisted(state, action);
};
