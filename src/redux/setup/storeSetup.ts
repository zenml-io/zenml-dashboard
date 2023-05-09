import { createStore, applyMiddleware } from 'redux';
import { persistStore, getStoredState, REHYDRATE } from 'redux-persist';

import createSagaMiddleware from 'redux-saga';

import { getComposeWithEnhancers, logger } from './storeEnhancers';

import rootSaga from '../rootSaga';
import { persistedReducer, persistConfig } from './storeReduxSetup';

function crossBrowserListener(store: any, persistConfig: any) {
  return async function () {
    const state = await getStoredState(persistConfig);

    store.dispatch({
      type: REHYDRATE,
      key: persistConfig.key,
      payload: state,
    });
  };
}

export const sagaMiddleware = createSagaMiddleware();
export const enhancers = getComposeWithEnhancers()(
  applyMiddleware(sagaMiddleware, logger),
);

export default function configureStore(): any {
  const store = createStore(persistedReducer, enhancers);
  sagaMiddleware.run(rootSaga);

  window.addEventListener(
    'storage',
    crossBrowserListener(store, persistConfig),
  );

  const persistor = persistStore(store);

  return { store, persistor };
}
