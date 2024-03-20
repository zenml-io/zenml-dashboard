import { REQUESTED, SUCCESS, FAILURE } from './constants';

export const generateApiActionsTypes = (pattern: string): TApiActionsTypes => ({
  request: `${pattern}_${REQUESTED}`,
  success: `${pattern}_${SUCCESS}`,
  failure: `${pattern}_${FAILURE}`,
});
