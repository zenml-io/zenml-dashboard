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

import stackComponentsReducer, {
  initialState as stackComponentsInitialState,
} from './reducers/stacksReducer';

import runsReducer, {
  initialState as runsInitialState,
} from './reducers/runsReducer';

import billingReducer, {
  initialState as billingInitialState,
} from './reducers/billingReducer';

import pipelinePagesReducer, {
  initialState as pipelinePagesInitialState,
} from './reducers/pipelinePagesReducer';

import stackPagesReducer, {
  initialState as stackPagesInitialState,
} from './reducers/stackPagesReducer';

import stripeReducer, {
  initialState as sripeInitialState,
} from './reducers/stripeReducer';

const initialState = {
  session: sessionInitialState,
  users: usersInitialState,
  organizations: organizationsInitialState,
  workspaces: workspacesInitialState,
  pipelines: pipelinesInitialState,
  stacks: stacksInitialState,
  stackComponents: stackComponentsInitialState,
  runs: runsInitialState,
  billing: billingInitialState,
  pipelinePages: pipelinePagesInitialState,
  stacksPages: stackPagesInitialState,
  stripe: sripeInitialState,
};

export const persisted = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  organizations: organizationsReducer,
  workspaces: workspacesReducer,
  pipelines: pipelinesReducer,
  stacks: stacksReducer,
  stackComponents: stackComponentsReducer,
  runs: runsReducer,
  billing: billingReducer,
  pipelinePages: pipelinePagesReducer,
  stackPages: stackPagesReducer,
  stripe: stripeReducer,
});

export default (state: any, action: any) => {
  if (action.type === ACCOUNT_LOGOUT) {
    return persisted(initialState as any, action);
  }

  return persisted(state, action);
};
