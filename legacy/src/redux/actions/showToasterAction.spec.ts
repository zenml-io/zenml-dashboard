import { showToasterAction, ActionType } from './showToasterAction';
import { toasterTypes } from '../../constants';
import { SHOW_TOASTER_ACTION_TYPE } from '../actionTypes';

const onShowToasterAction = (
  description: string,
  type?: TToasterTypes,
): ActionType => showToasterAction({ description, type });

describe('runs', () => {
  it('has correct type', () => {
    expect(onShowToasterAction('test').type).toEqual(SHOW_TOASTER_ACTION_TYPE);
  });

  it('has correct payload description', () => {
    expect(onShowToasterAction('test').payload.description).toEqual('test');
  });

  it('has correct payload type', () => {
    expect(onShowToasterAction('test', 'success').payload.type).toEqual(
      toasterTypes.success,
    );
  });
});
