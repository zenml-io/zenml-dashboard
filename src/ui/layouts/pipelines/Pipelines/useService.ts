/* eslint-disable */

import { useEffect } from 'react';

import {
  pipelinePagesActions,
  runsActions,
  pipelinesActions,
  runPagesActions,
} from '../../../../redux/actions';

import { useDispatch } from '../../../hooks';

interface ServiceInterface {
  setFetchingForPipeline: (arg: boolean) => void;
  setFetchingForAllRuns: (arg: boolean) => void;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();

  useEffect(() => {
    setFetchingForPipeline(true);
    setFetchingForAllRuns(true);
    dispatch(
      runsActions.allRuns({
        onSuccess: () => setFetchingForAllRuns(false),
        onFailure: () => setFetchingForAllRuns(false),
      }),
    );
    dispatch(
      pipelinesActions.getMy({
        onSuccess: () => setFetchingForPipeline(false),
        onFailure: () => setFetchingForPipeline(false),
      }),
    );
  }, []);

  const setFetchingForPipeline = (fetching: boolean) => {
    dispatch(pipelinePagesActions.setFetching({ fetching }));
  };
  const setFetchingForAllRuns = (fetching: boolean) => {
    dispatch(runPagesActions.setFetching({ fetching }));
  };

  return {
    setFetchingForPipeline,
    setFetchingForAllRuns,
  };
};
