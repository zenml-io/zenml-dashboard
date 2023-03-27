import { runActionTypes } from '../../actionTypes';


export const setRunDetails = (data: any) => {
    return {
        type: runActionTypes.setRunsDetails,
        payload: {
            data:data,
            isAuthenticated: true,
            failureActionType: runActionTypes.setRunsDetails.failure,
            successActionType: runActionTypes.setRunsDetails.success,
           
        }
    }
};
