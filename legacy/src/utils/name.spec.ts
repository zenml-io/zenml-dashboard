import { getInitials } from './name';

const expectToTestGetInitials = (value: any, returns: string) => {
  expect(getInitials(value)).toEqual(returns);
};

describe('getInitials', () => {
  it('does not crash app with null or undefined', () => {
    expectToTestGetInitials(null, '');
  });
  it('given one name, returns first name initial only', () => {
    expectToTestGetInitials('Tobi', 'T');
  });
  it('for 2 or more names, returns two names', () => {
    expectToTestGetInitials('Tobi Rick', 'TR');
    expectToTestGetInitials('Tobi Rick Hallo', 'TR');
  });
});
