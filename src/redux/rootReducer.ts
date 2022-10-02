import { combineReducers } from 'redux';
import persisted from './persistedReducers';
import toaster from './reducers/toasterReducer';

const appReducer = combineReducers({
  toaster,
  persisted,
});

export default (state: any, action: any): any => {
  return appReducer(state, action);
};
