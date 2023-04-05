import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { sessionSelectors } from '../../redux/selectors';
import { HUB_API_URL } from '../../api/constants';

export const useAuthToken = (): string | null =>
  useSelector(sessionSelectors.authenticationToken);

export const useHubToken = (): string | null =>
  useSelector(sessionSelectors.hubToken);

export const useHubUser = (): THubUser | undefined => {
  const [user, setUser] = useState(undefined as THubUser | undefined);
  const hubToken = useHubToken();

  useEffect(() => {
    if (user || !hubToken) return;

    axios
      .get(`${HUB_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${hubToken}` },
      })
      .then((res) => setUser(res.data));
  }, [hubToken]);

  return user;
};
