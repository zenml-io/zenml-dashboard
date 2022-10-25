import {
  loginActionTypes,
  userActionTypes,
  organizationActionTypes,
  pipelineActionTypes,
  runActionTypes,
} from '../actionTypes';
import { actionTypesHandledByRequestSaga } from './actionTypesHandledByRequestSaga';

export const expectedActionTypes = [
  loginActionTypes.request,
  userActionTypes.getMyUser.request,
  userActionTypes.getUserForId.request,
  organizationActionTypes.getMyOrganization.request,
  organizationActionTypes.getInviteForCode.request,
  organizationActionTypes.getInvites.request,
  organizationActionTypes.getMembers.request,
  organizationActionTypes.invite.request,
  organizationActionTypes.deleteInvite.request,
  organizationActionTypes.retryInvoice.request,
  pipelineActionTypes.getMyPipelines.request,
  pipelineActionTypes.getPipelineForId.request,
  runActionTypes.getRunForId.request,
];

describe('saga reacts to action type:', () => {
  it('runs', () => {
    expect(actionTypesHandledByRequestSaga.sort()).toEqual(
      expectedActionTypes.sort(),
    );
  });
});
