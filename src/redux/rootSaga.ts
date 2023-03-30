import { all, call, delay } from 'redux-saga/effects';

import {
  requestSaga,
} from './sagas/requestSaga';

const DELAY_BETWEEN_RESTARTS = 1000;
function* spawnSaga(saga: any): any {
  while (true) {
    try {
      yield call(saga);
    } catch (e) {
      console.log(e);
    }
    yield delay(DELAY_BETWEEN_RESTARTS);
  }
}

function* rootSaga(): any {
  while (true) {
    const sagas = [
      spawnSaga(requestSaga),
    ] as any;

    yield all(sagas);
  }
}

export default rootSaga;
