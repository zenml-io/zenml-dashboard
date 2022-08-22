import { getToasterDescription, getToasterType } from './toaster';

const expectToGetToasterDescriptionWith = (
  state: any,
  resultsIn: string | null,
): void => {
  expect(getToasterDescription(state)).toEqual(resultsIn);
};

describe('getToasterDescription', () => {
  it('when state is null or undefined', () => {
    expectToGetToasterDescriptionWith(null, null);
    expectToGetToasterDescriptionWith(undefined, null);
  });

  it('get toast when toaster is null', () => {
    expectToGetToasterDescriptionWith({ toaster: null }, null);
    expectToGetToasterDescriptionWith({ toaster: undefined }, null);
    expectToGetToasterDescriptionWith({ toaster: { description: null } }, null);
    expectToGetToasterDescriptionWith(
      { toaster: { description: undefined } },
      null,
    );
  });

  it('get toast description', () => {
    expectToGetToasterDescriptionWith(
      { toaster: { description: 'some value' } },
      'some value',
    );
  });
});

const expectToGetToasterTypeWith = (
  state: any,
  resultsIn: string | null,
): void => {
  expect(getToasterType(state)).toEqual(resultsIn);
};

describe('getToasterType', () => {
  it('when state is null or undefined', () => {
    expectToGetToasterTypeWith(null, null);
    expectToGetToasterTypeWith(undefined, null);
  });

  it('get type when toaster is null', () => {
    expectToGetToasterTypeWith({ toaster: null }, null);
    expectToGetToasterTypeWith({ toaster: undefined }, null);
    expectToGetToasterTypeWith({ toaster: { type: null } }, null);
    expectToGetToasterTypeWith({ toaster: { type: undefined } }, null);
  });

  it('get toast type success', () => {
    expectToGetToasterTypeWith({ toaster: { type: 'success' } }, 'success');
  });

  it('get toast type failure', () => {
    expectToGetToasterTypeWith({ toaster: { type: 'failure' } }, 'failure');
  });
});
