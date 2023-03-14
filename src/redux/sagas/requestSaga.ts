import { take, put, call, select, fork } from 'redux-saga/effects';
import { getTranslateByScope } from '../../services/i18n';
import { toasterTypes } from '../../constants/toast';
import { sessionActions } from '../actions/session';
import { sessionSelectors } from '../selectors';
import { showToasterAction } from '../actions';
import { httpStatus } from '../../constants';
import { actionTypesHandledByRequestSaga } from './actionTypesHandledByRequestSaga';

const translate = getTranslateByScope('Authentication error');
console.log("__UNAUTH")

export const isRequestAction = (action: any): boolean => {
  return actionTypesHandledByRequestSaga.includes(action.type);
};

const isUnauthenticatedError = (e: any, action: any) => {
  if (!e.response) return false;

  // console.log("__UNAUTH")
  return (
    e.response.status === httpStatus.unauthorized &&
    action.payload.isAuthenticated
  );
};

function* logoutAndNotifyUserThatSessionExpired(): any {
  yield put(sessionActions.logout());
  yield put(
    showToasterAction({
      description: translate(''),
      type: toasterTypes.failure,
    }),
  );
}

function* unprocessablEntity(): any {
  console.log("__UNAUTH unprocessablEntity")

  yield put(
    showToasterAction({
      description: 'Something went wrong',
      type: toasterTypes.failure,
    }),
  );
}

function* handleUnauthenticated(action: any): any {
  
  console.log("__UNAUTH handleUnauthenticated")

  yield put({
    type: action.payload.failureActionType,
  });

  yield* logoutAndNotifyUserThatSessionExpired();
}

function* callFailureCallback(action: any): any {
  console.log("__UNAUTH callFailureCallback")

  if (action.payload.onFailure) {
    yield call(action.payload.onFailure, action.payload.errorText);
  }
}

function* callSuccessCallback(action: any, response: any): any {

  console.log("__UNAUTH callSuccessCallback")


  if (action.payload.onSuccess) {
    yield call(action.payload.onSuccess, response.data);
  }
}

export function* handleRequestSaga(action: any) {

  console.log("__UNAUTH handleRequestSaga")

  try {
    const params = action.payload.params || {};

    let response = {} as any;

    if (action.payload.isAuthenticated) {
      const authenticationToken = yield select(
        sessionSelectors.authenticationToken,
      );
      response = yield call(action.payload.apiMethod, {
        ...params,
        authenticationToken,
      });
    } else {
      response = yield call(action.payload.apiMethod, {
        ...params,
      });
    }

    if (response && response.error) {
      throw new Error(response.error);
    } else {
      yield put({
        type: action.payload.successActionType,
        payload: response.data,
        requestParams: action.payload.params,
      });

      yield* callSuccessCallback(action, response);
    }
  } catch (e) {
    if (isUnauthenticatedError(e, action)) {
      yield* handleUnauthenticated(action);
    } else if (e?.response?.status === httpStatus.unprocessablEntity) {
      yield* unprocessablEntity();
    } else {
      let errorText = 'Something went wrong!';
      if (e?.message?.indexOf('Network Error') === -1) {
        // this means its not a generic message from the server
        errorText = e.response ? e.response.data.detail : '';
      }

      const newAction = {
        type: action.payload.failureActionType,
        payload: {
          error: e,
          errorText: errorText,
          onFailure: action.payload.onFailure,
        },
      };
      yield put(newAction);
      yield* callFailureCallback(newAction);
    }
  }
}

export function* requestSaga() {
  
  console.log("__UNAUTH requestSaga")

  while (true) {
    const action = yield take(isRequestAction);
    yield fork(handleRequestSaga, action);
  }
}
