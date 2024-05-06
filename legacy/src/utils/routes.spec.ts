import { getSearchParam } from './routes';

const expectToGetSearchParam = (param: any, results: any): any => {
  expect(getSearchParam(param, 'some-param')).toEqual(results);
};

describe('getSearchParam', () => {
  it('returns null given null or undefined', () => {
    expectToGetSearchParam(null, null);
    expectToGetSearchParam(undefined, null);
  });

  it('runs', () => {
    expectToGetSearchParam({ search: { 'some-param': 1 } }, '1');
  });
});
