/* eslint-disable */

import { useEffect } from 'react';
import { sessionActions } from '../../redux/actions/session';
import { useDispatch } from '../hooks';

export const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem('persistSelectedStack');
    dispatch(sessionActions.logout());
  });

  return null;
};
