import { organizationSelectors } from './organizations';

const runTest = {
  myOrganization: (state: any) =>
    expect(organizationSelectors.myOrganization(state)),
};

describe('myUser', () => {
  it('given nil values, returns null', () => {
    runTest.myOrganization(null).toEqual(null);
    runTest.myOrganization(undefined).toEqual(null);
  });

  describe('give a state', () => {
    const id = 'someId';
    const organizations = {
      byId: {
        [id]: {
          id,
          anyOtherProps: 'anyOtherProps',
        },
      },
      myOrganizationId: id,
    };

    const state = {
      persisted: {
        organizations,
      },
    };

    it('given nil values, returns null', () => {
      runTest.myOrganization(null).toEqual(null);
      runTest.myOrganization(undefined).toEqual(null);
    });

    it('given present user, returns content', () => {
      runTest.myOrganization(state).toEqual(organizations.byId[id]);
    });
  });
});
