import { runActionTypes } from '../../actionTypes';
import getRunByIdApi from '../../../api/runs/getRunByIdApi';

// export const setRunDetails = ({
//   runId,
//   stackId,
//   pipelineId,
//   stackComponentId,
//   onSuccess,
//   onFailure,
// }: {
//   runId: TId;
//   stackId?: TId;
//   pipelineId?: TId;
//   stackComponentId?: TId;
//   onSuccess?: () => void;
//   onFailure?: () => void;
// }): TRequestAction => ({
//   type: runActionTypes.getRunForId.request,
//   payload: {
//     apiMethod: getRunByIdApi,
//     isAuthenticated: true,
//     failureActionType: runActionTypes.getRunForId.failure,
//     successActionType: runActionTypes.getRunForId.success,
//     params: { runId, stackId, pipelineId, stackComponentId },
//     onSuccess,
//     onFailure,
//   }, 
// });

export const setRunDetails = (data: any) => {
    console.log("__UNAUTH setRunDetails", data)
    return {
        type: runActionTypes.setRunsDetails,
        payload: {
            apiMethod: getRunByIdApi,
            isAuthenticated: true,
            failureActionType: runActionTypes.setRunsDetails.failure,
            successActionType: runActionTypes.setRunsDetails.success,
           
        }
    }
};
