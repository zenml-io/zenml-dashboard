import { runActionTypes } from '../../actionTypes';


// export const setRunDetails = (data: any) => {
//     return {
//         type: runActionTypes.setRunsDetails.request,
//         payload: {
//             data:data,
//             isAuthenticated: true,
//             failureActionType: runActionTypes.setRunsDetails.failure,
//             successActionType: runActionTypes.setRunsDetails.success,
//         }
//     }
// };


// export const setRunDetails = ({

//     data,
//     onSuccess,
//     onFailure,
//   }: {
  
//     data:any
//     onSuccess?: () => void;
//     onFailure?: () => void;
//   }): TRequestAction => ({
//     type: runActionTypes.setRunsDetails.request,
//     payload: {
//     //   apiMethod: getMyStacksApi,
//       isAuthenticated: true,
//       failureActionType: runActionTypes.setRunsDetails.failure,
//       successActionType: runActionTypes.setRunsDetails.success,
//       params: {
    
//       },
//       onSuccess,
//       onFailure,
//     },
//   });