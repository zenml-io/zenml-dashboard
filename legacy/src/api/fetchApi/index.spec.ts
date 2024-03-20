import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { httpMethods } from '../constants';

import { fetchApi, DEFAULT_HEADERS, fetchApiForAWS } from './';

const TEST_URL = './TEST_URL';
const mock = new MockAdapter(axios);
describe('fetchApiUnauthorizedRequest', () => {
  it('works with a get', async () => {
    mock.onAny(TEST_URL).reply(200, { param: 1 });

    const value = await fetchApi({
      url: TEST_URL,
      method: httpMethods.get,
    });
    expect(value.data).toEqual({ param: 1 });
  });

  it('works with a post', async () => {
    mock.onAny(TEST_URL).reply(200, { param: 1 });

    await fetchApi({
      url: TEST_URL,
      method: httpMethods.post,
    });
    expect(mock.history.post[0].headers).toEqual(DEFAULT_HEADERS);
  });

  it('works with a put', async () => {
    mock.onAny(TEST_URL).reply(200, { param: 1 });

    const data = { someData: 'someData' };
    await fetchApi({
      url: TEST_URL,
      method: httpMethods.put,
      data,
    });
    expect(mock.history.put[0].data).toEqual('{"someData":"someData"}');
  });

  it('works with a delete', async () => {
    mock.onAny(TEST_URL).reply(200, { param: 1 });

    await fetchApi({
      url: TEST_URL,
      method: httpMethods.delete,
      data: { id: 1 },
    });
    expect(mock.history.delete[0].data).toEqual('{"id":1}');
  });
});

describe('fetchApiForAWS', () => {
  it('works', async () => {
    mock.onAny(TEST_URL).reply(200, { param: 1 });

    const file = new File([''], 'fileName');
    await fetchApiForAWS({
      url: TEST_URL,
      file,
    });

    expect(mock.history.put[1]).toEqual(
      expect.objectContaining({
        method: 'put',
        data: file,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': file.type,
        },
      }),
    );
  });
});
