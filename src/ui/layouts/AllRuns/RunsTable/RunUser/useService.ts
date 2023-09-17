/* eslint-disable */

import { useState, useEffect } from 'react';
import { userActions } from '../../../../../redux/actions';
import { userSelectors } from '../../../../../redux/selectors';
import { useDispatch, useSelector } from '../../../../hooks';
import { Run, User } from '../../../../../api/types';

interface ServiceInterface {
  fetching: boolean;
  user: User;
}

export const useService = ({ run }: { run: Run }): ServiceInterface => {
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState<boolean>(false);

  const user = useSelector(userSelectors.userForId(run.user?.id as string));

  useEffect(() => {
    setFetching(true);
    dispatch(
      userActions.userForId({
        userId: run.user?.id as string,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [run.id]);

  return { fetching, user };
};
