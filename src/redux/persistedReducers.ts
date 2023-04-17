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
import workspacesReducer, {
  initialState as workspacesInitialState,
} from './reducers/workspacesReducer';
import pipelinesReducer, {
  initialState as pipelinesInitialState,
} from './reducers/pipelinesReducer';

import stacksReducer, {
  initialState as stacksInitialState,
} from './reducers/stacksReducer';

import secretsReducer, {
  initialState as secretsInitialState,
} from './reducers/secretsReducer';

import rolesReducer, {
  initialState as rolesInitialState,
} from './reducers/rolesReducer';

import repositoryReducer, {
  initialState as repositoryState,
} from './reducers/repositories';

import stackComponentsReducer, {
  initialState as stackComponentsInitialState,
} from './reducers/stackComponentsReducer';
import flavorsReducer, {
  initialState as flavorsInitialState,
} from './reducers/flavorsReducer';
import flavorPagesReducer, {
  initialState as flavorPagesInitialState,
} from './reducers/flavorPagesReducer';
import hubPromptReducer, {
  initialState as hubPromptInitialState,
} from './reducers/hubPromptReducer';
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

import secretPagesReducer, {
  initialState as secretsPagesInitialState,
} from './reducers/secretPagesReducer';

const initialState = {
  session: sessionInitialState,
  users: usersInitialState,
  organizations: organizationsInitialState,
  pipelines: pipelinesInitialState,
  workspaces: workspacesInitialState,
  stacks: stacksInitialState,
  secrets: secretsInitialState,
  stackComponents: stackComponentsInitialState,
  flavors: flavorsInitialState,
  flavorsPages: flavorPagesInitialState,
  hubPrompt: hubPromptInitialState,
  runs: runsInitialState,
  roles: rolesInitialState,
  runPages: runPagesInitialState,
  pipelinePages: pipelinePagesInitialState,
  stacksPages: stackPagesInitialState,
  secretsPages: secretsPagesInitialState,
  repositories: repositoryState
};

export const persisted = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  roles: rolesReducer,
  organizations: organizationsReducer,
  workspaces: workspacesReducer,
  pipelines: pipelinesReducer,
  stacks: stacksReducer,
  secretPages: secretPagesReducer,
  secrets: secretsReducer,
  stackComponents: stackComponentsReducer,
  runs: runsReducer,
  runPages: runPagesReducer,
  pipelinePages: pipelinePagesReducer,
  stackPages: stackPagesReducer,
  flavors: flavorsReducer,
  flavorPages: flavorPagesReducer,
  hubPrompt: hubPromptReducer,
  repositories: repositoryReducer
});

export default (state: any, action: any) => {
  if (action.type === ACCOUNT_LOGOUT) {
    return persisted(initialState as any, action);
  }

  return persisted(state, action);
};
