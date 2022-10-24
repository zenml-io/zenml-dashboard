/* eslint-disable */

import { useEffect } from 'react';
import { stackPagesActions, stacksActions } from '../../../../redux/actions';
import { stackPagesSelectors } from '../../../../redux/selectors';
import { useDispatch, useSelector, useLocationPath } from '../../../hooks';

interface ServiceInterface {
  setFetching: (arg: boolean) => void;
}

export const useService = (): ServiceInterface => {
  const locationPath = useLocationPath();
  const dispatch = useDispatch();

  useEffect(() => {
    setFetching(true);
    dispatch(
      stacksActions.getMy({
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [locationPath]);

  const setFetching = (fetching: boolean) => {
    dispatch(stackPagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
  };
};
