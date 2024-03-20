import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sessionSelectors } from '../../redux/selectors';
import { HUB_API_URL } from '../../api/constants';
import { useToaster } from './useToaster';
import { disconnectHubActionTypes } from '../../redux/actionTypes';
import { hubAxios } from '../../utils/axios';

export const useAuthToken = (): string | null =>
  useSelector(sessionSelectors.authenticationToken);

export const useHubToken = (): string | null => {
  const hubToken = useSelector(sessionSelectors.hubToken);
  const { failureToast } = useToaster();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hubToken) return;

    getUserDetails(hubToken).catch(() => {
      failureToast({
        description: 'Hub token has expired; please reconnect in settings',
      });

      dispatch({ type: disconnectHubActionTypes.success });
    });
    // eslint-disable-next-line
  }, []);

  return hubToken;
};

export const useHubUser = (): THubUser | undefined => {
  const [user, setUser] = useState(undefined as THubUser | undefined);
  const hubToken = useHubToken();

  useEffect(() => {
    if (user || !hubToken) return;

    getUserDetails(hubToken).then((res) => setUser(res.data));

    // eslint-disable-next-line
  }, [hubToken]);

  return user;
};

function getUserDetails(hubToken: string) {
  return hubAxios.get(`${HUB_API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${hubToken}` },
  });
}
