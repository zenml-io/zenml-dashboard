import { toasterTypes } from '../../constants/toast';
import { toaster } from './toasterReducer';
import { SHOW_TOASTER_ACTION_TYPE } from '../actionTypes';

const action = (type: any, description: string, toasterType?: any): any => ({
  type,
  payload: { description, type: toasterType },
});

describe('SHOW_TOASTER_ACTION_TYPE', () => {
  it('adds description to toaster', () => {
    const description = 'some-description';
    const state = { description: null };
    const expectedState = {
      description,
    };
    expect(
      toaster(state, action(SHOW_TOASTER_ACTION_TYPE, description)),
    ).toEqual(expectedState);
  });

  it('replaces old description with new description', () => {
    const description = 'some-description';
    const state = { description: 'old data' };
    const expectedState = {
      description,
    };
    expect(
      toaster(state, action(SHOW_TOASTER_ACTION_TYPE, description)),
    ).toEqual(expectedState);
  });

  it('is not affected by other actions', () => {
    const description = 'some-description';
    const state = { description: null };

    expect(toaster(state, action('some-random-action', description))).toEqual(
      state,
    );
  });

  it('updates the state when it has data ', () => {
    const description = 'some-description';
    const state = { description: 'old data' };

    expect(toaster(state, action('some-random-action', description))).toEqual(
      state,
    );
  });

  it('allows receiving type', () => {
    const description = 'some-description';
    const state = { description: 'old data', type: toasterTypes.success };

    expect(
      toaster(
        state,
        action('some-random-action', description, toasterTypes.success),
      ),
    ).toEqual(state);
  });
});
