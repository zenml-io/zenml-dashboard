/* eslint-disable */

import { useEffect } from 'react';
import {
  stackComponentsActions,
  stackPagesActions,
} from '../../../../redux/actions';

import { useDispatch, useLocationPath } from '../../../hooks';

interface ServiceInterface {
  setFetching: (arg: boolean) => void;
}

export const useService = (): ServiceInterface => {
  const locationPath = useLocationPath();

  const dispatch = useDispatch();

  useEffect(() => {
    setFetching(true);
    dispatch(
      stackComponentsActions.getMy({
        type: locationPath.split('/')[2],
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
