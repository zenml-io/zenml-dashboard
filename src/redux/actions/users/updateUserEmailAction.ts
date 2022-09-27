import { userActionTypes } from '../../actionTypes';
import updateUserEmailApi from '../../../api/users/updateUserEmailApi';


export const updateUserEmailAction = ({
  onSuccess,
  onFailure,
}: {
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: userActionTypes.updateUser.request,
  payload: {
    apiMethod: updateUserEmailApi,
    isAuthenticated: true,
    failureActionType: userActionTypes.updateUser.failure,
    successActionType: userActionTypes.updateUser.success,
    params: { email: 'default@gmail.com', username: 'default' },
    onSuccess,
    onFailure,
  },
});


// export const updateUserEmailAction = ({
//   userId,
//   email,
//   username,
//   onSuccess,
//   onFailure,
// }: {
//   email: string;
//   username: string;
//   userId: string;
//   onSuccess?: () => void;
//   onFailure?: () => void;
// }): TRequestAction => ({
//   type: userActionTypes.updateUserEmail.request,
//   payload: {
//     apiMethod: updateUserEmailApi,
//     isAuthenticated: true,
//     failureActionType: userActionTypes.updateUserEmail.failure,
//     successActionType: userActionTypes.updateUserEmail.success,
//     params: { userId, email, username },
//     onSuccess,
//     onFailure,
//   },
// });
