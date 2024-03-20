import { logoutAction } from './logoutAction';
import { forgotAction } from './forgotAction';
import { emailUpdateAction } from './emailUpdate';

export const sessionActions = {
  logout: logoutAction,
  forgotPassword: forgotAction,
  emailUpdate: emailUpdateAction,
};
