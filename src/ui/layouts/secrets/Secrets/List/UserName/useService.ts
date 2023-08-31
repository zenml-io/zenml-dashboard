/* eslint-disable */

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../../../../redux/actions';
import { userSelectors } from '../../../../../../redux/selectors';
import { Secret } from '../../../../../../api/types';

interface ServiceInterface {
  fetching: boolean;
  user: TUser;
}

export const useService = ({
  secret,
}: {
  secret: Secret;
}): ServiceInterface => {
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState<boolean>(false);

  const user = useSelector(userSelectors.userForId(secret.user?.id as string));

  useEffect(() => {
    setFetching(true);
    dispatch(
      userActions.userForId({
        userId: secret.user?.id as string,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [secret.id]);

  return { fetching, user };
};
