/* eslint-disable */

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../../../../redux/actions';
import { userSelectors } from '../../../../../../redux/selectors';
import { ServiceConnector, User } from '../../../../../../api/types';

interface ServiceInterface {
  fetching: boolean;
  user: User;
}

export const useService = ({
  connector,
}: {
  connector: ServiceConnector;
}): ServiceInterface => {
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState<boolean>(false);

  const user = useSelector(
    userSelectors.userForId(connector.body?.user?.id as string),
  );

  useEffect(() => {
    setFetching(true);
    dispatch(
      userActions.userForId({
        userId: user.id,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [connector.id]);

  return { fetching, user };
};
