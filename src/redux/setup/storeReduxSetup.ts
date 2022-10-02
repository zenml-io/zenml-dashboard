import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import rootReducer from '../rootReducer';

import { isDebuggingInChrome } from './isDebuggingInChrome';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

export const persistConfig = {
  key: 'freework_business_app_root',
  storage,
  whitelist: ['persisted'],
  debug: isDebuggingInChrome,
  stateReconciler: hardSet,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
