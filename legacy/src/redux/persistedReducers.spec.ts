import { persisted } from './persistedReducers';

import sessionReducer from './reducers/sessionReducer';
import usersReducer from './reducers/usersReducer';
import organizationsReducer from './reducers/organizationsReducer';

import pipelinesReducer from './reducers/pipelinesReducer';
import stacksReducer from './reducers/stacksReducer';
import stackComponentReducer from './reducers/stackComponentsReducer';
import runsReducer from './reducers/runsReducer';

import pipelinePagesReducer from './reducers/pipelinePagesReducer';
import runPagesReducer from './reducers/runPagesReducer';
import stackPagesReducer from './reducers/stackPagesReducer';
import secretsReducer from './reducers/secretsReducer';
import secretPagesReducer from './reducers/secretPagesReducer';

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
  expectToMap('pipelines', pipelinesReducer);
  expectToMap('stacks', stacksReducer);
  expectToMap('secrets', secretsReducer);
  expectToMap('secretPages', secretPagesReducer);
  expectToMap('stackComponents', stackComponentReducer);
  expectToMap('runs', runsReducer);
  expectToMap('run', runPagesReducer);
  expectToMap('pipelinePages', pipelinePagesReducer);
  expectToMap('stackPages', stackPagesReducer);
});
