/* eslint-disable */

import { useState, useEffect } from 'react';
import { userActions } from '../../../../../redux/actions';
import { userSelectors } from '../../../../../redux/selectors';
import { useDispatch, useSelector } from '../../../../hooks';

interface ServiceInterface {
  fetching: boolean;
  user: TUser;
}

export const useService = ({ run }: { run: TRun }): ServiceInterface => {
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState<boolean>(false);

  const user = useSelector(userSelectors.userForId(run.userId));

  useEffect(() => {
    setFetching(true);
    dispatch(
      userActions.userForId({
        userId: run.userId,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [run.id]);

  return { fetching, user };
};
