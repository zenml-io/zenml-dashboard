import organizationsReducer from './organizationsReducer';
import { organizationActionTypes } from '../actionTypes';

const organization = {
  id: '1245',
  name: 'orga',
} as TOrganization;

const getMyOrganizationSuccessful = (
  currentState: any,
  payload: TOrganization = organization,
): any => {
  const action = {
    type: organizationActionTypes.getMyOrganization.success,
    payload,
  };

  const nextState = organizationsReducer(currentState, action);
  return { nextState };
};

const testStateAfterSuccessfulMyOrganizationFetch = (state: {
  ids: TId[];
  byId: Record<TId, TOrganization>;
  myOrganizationId: TId | null;
}): void => {
  const { nextState } = getMyOrganizationSuccessful(state);
  it('ids is added to the store', () => {
    expect(nextState.ids).toEqual(['other-id', organization.id]);
  });

  it('byIds is added to the store', () => {
    const byId = {
      [organization.id]: organization,
      ['other-id']: organization,
    };
    expect(nextState.byId).toEqual(byId);
  });

  it('myOrganizationId added to the store', () => {
    expect(nextState.myOrganizationId).toEqual(organization.id);
  });
};

describe('given a successful getMyOrganization action', () => {
  describe('The store has data, adds the organization', () => {
    const byId = {
      ['other-id']: organization,
    };
    const ids = ['other-id'];
    testStateAfterSuccessfulMyOrganizationFetch({
      byId,
      ids,
      myOrganizationId: 'other-id',
    });
  });
});
