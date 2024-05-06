import { SHOW_TOASTER_ACTION_TYPE } from '../actionTypes';

export interface ActionType {
  type: string;
  payload: {
    description: string | null;
    type: TToasterTypes;
  };
}

export const showToasterAction = ({
  description,
  type,
}: {
  description: string | null;
  type?: TToasterTypes;
}): ActionType => ({
  type: SHOW_TOASTER_ACTION_TYPE,
  payload: {
    description,
    type: type || 'success',
  },
});
