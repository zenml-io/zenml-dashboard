import { persisted } from './persistedReducers';

import sessionReducer from './reducers/sessionReducer';
import usersReducer from './reducers/usersReducer';
import organizationsReducer from './reducers/organizationsReducer';
import workspacesReducer from './reducers/workspacesReducer';
import pipelinesReducer from './reducers/pipelinesReducer';
import stacksReducer from './reducers/stacksReducer';
import runsReducer from './reducers/runsReducer';
import billingReducer from './reducers/billingReducer';
import pipelinePagesReducer from './reducers/pipelinePagesReducer';
import stackPagesReducer from './reducers/stackPagesReducer';

jest.mock('redux', () => ({
  combineReducers: (reducerObject: any): any => reducerObject,
}));

const reduxObject = persisted as any;

const expectToMap = (key: string, reducer: any) => {
  it(key, () => {
    expect(reduxObject[key]).toEqual(reducer);
  });
};

describe('expect to map keys', () => {
  expectToMap('session', sessionReducer);
  expectToMap('users', usersReducer);
  expectToMap('organizations', organizationsReducer);
  expectToMap('workspaces', workspacesReducer);
  expectToMap('pipelines', pipelinesReducer);
  expectToMap('stacks', stacksReducer);
  expectToMap('runs', runsReducer);
  expectToMap('billing', billingReducer);
  expectToMap('pipelinePages', pipelinePagesReducer);
  expectToMap('stackPages', stackPagesReducer);
});
