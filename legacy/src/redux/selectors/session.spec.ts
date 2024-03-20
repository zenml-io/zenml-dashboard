import { sessionSelectors } from './session';

const expectToGetAuthenticationToken = (
  state: any,
  resultsIn: string | undefined | null,
): void => {
  expect(sessionSelectors.authenticationToken(state)).toEqual(resultsIn);
};

describe('authenticationToken', () => {
  it('when state is null or undefined returns undefined', () => {
    expectToGetAuthenticationToken(null, undefined);
    expectToGetAuthenticationToken(undefined, undefined);
  });

  it('when session is null returns null', () => {
    expectToGetAuthenticationToken({ persisted: { session: null } }, undefined);
    expectToGetAuthenticationToken(
      { persisted: { session: undefined } },
      undefined,
    );
    expectToGetAuthenticationToken(
      { persisted: { session: { authenticationToken: null } } },
      null,
    );
    expectToGetAuthenticationToken(
      { persisted: { session: { authenticationToken: undefined } } },
      undefined,
    );
  });

  it(`returns true when authenticationToken is present`, () => {
    expectToGetAuthenticationToken(
      { persisted: { session: { authenticationToken: 'some-token' } } },
      'some-token',
    );
  });
});
