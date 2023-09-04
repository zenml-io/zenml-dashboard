/* eslint-disable */

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../../../../redux/actions';
import { userSelectors } from '../../../../../../redux/selectors';
import { User } from '../../../../../../api/types';

interface ServiceInterface {
  fetching: boolean;
  user: User;
}

export const useService = ({ stack }: { stack: TStack }): ServiceInterface => {
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState<boolean>(false);

  const user = useSelector(userSelectors.userForId(stack.userId));

  useEffect(() => {
    setFetching(true);
    dispatch(
      userActions.userForId({
        userId: stack.userId,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [stack.id]);

  return { fetching, user };
};
