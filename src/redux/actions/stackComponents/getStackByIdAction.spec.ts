import { getStackByIdAction } from './getStackByIdAction';
import { stackActionTypes } from '../../actionTypes';
import getStackByIdApi from '../../../api/stacks/getStackByIdApi';

import { testApiAction } from '../testUtils/testApiAction';

const pipelineId = 'pipelineId';

const onSuccess = jest.fn();
const onFailure = jest.fn();

export const onAction = (): any =>
  getStackByIdAction({ pipelineId, onSuccess, onFailure });

testApiAction({
  onAction,
  type: stackActionTypes.getStackForId.request,
  payload: {
    apiMethod: getStackByIdApi,
    isAuthenticated: true,
    failureActionType: stackActionTypes.getStackForId.failure,
    successActionType: stackActionTypes.getStackForId.success,
    params: { pipelineId },
    onFailure,
    onSuccess,
  },
});
