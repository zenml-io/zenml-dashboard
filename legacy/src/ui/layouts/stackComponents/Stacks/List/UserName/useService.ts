/* eslint-disable */

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../../../../redux/actions';
import { userSelectors } from '../../../../../../redux/selectors';
import { StackComponent, User } from '../../../../../../api/types';

interface ServiceInterface {
  fetching: boolean;
  user: User;
}

export const useService = ({
  stack,
}: {
  stack: StackComponent;
}): ServiceInterface => {
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState<boolean>(false);

  const user = useSelector(
    userSelectors.userForId(stack.body?.user?.id as string),
  );

  useEffect(() => {
    setFetching(true);
    dispatch(
      userActions.userForId({
        userId: stack.body?.user?.id as string,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [stack.id]);

  return { fetching, user };
};
