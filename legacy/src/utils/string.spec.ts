import { truncate } from './string';

const testTruncate = (string: any, number: any) =>
  expect(truncate(string, number));

describe('truncate', () => {
  it('truncates text', () => {
    testTruncate('123456789', 8).toEqual('12345678');
    testTruncate('1234', 8).toEqual('1234');
    testTruncate('', 8).toEqual('');
    testTruncate(null, 8).toEqual('');
    testTruncate('123456789', null).toEqual('123456789');
  });
});
