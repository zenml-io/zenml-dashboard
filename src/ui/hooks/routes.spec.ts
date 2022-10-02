import { useGetSearchParam, useReplaceRoute } from './routes';

const mockReplace = jest.fn();
jest.mock('react-router', () => ({
  useHistory: () => ({ replace: mockReplace }),
  useLocation: () => 'location_',
}));

jest.mock('../../utils', () => ({
  getSearchParam: (location: any, paramName: any): string =>
    location + paramName,
}));

describe('useReplaceRoute', () => {
  it('calls the history with the right param', () => {
    const param = 'routeName';
    useReplaceRoute().replaceRoute(param);
    expect(mockReplace.mock.calls[0][0]).toEqual(param);
  });
});

describe('useGetSearchParam', () => {
  it('calls the history with the right param', () => {
    expect(useGetSearchParam('param')).toEqual('location_param');
  });
});
