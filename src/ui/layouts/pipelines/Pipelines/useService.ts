/* eslint-disable */

import { useEffect } from 'react';
import {
  pipelinePagesActions,
  runsActions,
  pipelinesActions,
} from '../../../../redux/actions';

import { useDispatch } from '../../../hooks';

interface ServiceInterface {
  setFetching: (arg: boolean) => void;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();

  useEffect(() => {
    setFetching(true);
    console.log('asdasdasdasd');
    dispatch(
      runsActions.allRuns({
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
    dispatch(
      pipelinesActions.getMy({
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  });

  const setFetching = (fetching: boolean) => {
    dispatch(pipelinePagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
  };
};
