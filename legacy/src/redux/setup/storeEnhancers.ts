import { compose } from 'redux';
import { createLogger } from 'redux-logger';
import { isDebuggingInChrome } from './isDebuggingInChrome';

export const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

export const getComposeWithEnhancers = (): any => {
  if (!window || typeof window !== 'object') return compose;
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }
  return compose;
};
