/* eslint-disable */

import { useEffect } from 'react';

import {
  pipelinePagesActions,
  runsActions,
  pipelinesActions,
  runPagesActions,
} from '../../../../redux/actions';
import { projectSelectors } from '../../../../redux/selectors';

import { useDispatch, useSelector } from '../../../hooks';

interface ServiceInterface {
  setFetchingForPipeline: (arg: boolean) => void;
  setFetchingForAllRuns: (arg: boolean) => void;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const selectedProject = useSelector(projectSelectors.selectedProject);
  useEffect(() => {
    setFetchingForPipeline(true);
    setFetchingForAllRuns(true);
    dispatch(
      runsActions.allRuns({
        project: selectedProject,
        page: 1,
        size: 5,
        onSuccess: () => setFetchingForAllRuns(false),
        onFailure: () => setFetchingForAllRuns(false),
      }),
    );
    dispatch(
      pipelinesActions.getMy({
        page: 1,
        size: 5,
        name: '',
        project: selectedProject,
        onSuccess: () => setFetchingForPipeline(false),
        onFailure: () => setFetchingForPipeline(false),
      }),
    );
  }, [selectedProject]);

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

export const callActionForPipelinesForPagination = () => {
  const dispatch = useDispatch();
  const selectedProject = useSelector(projectSelectors.selectedProject);

  function dispatchPipelineData(page: number, size: number, filters?: any[]) {
    let filtersParam = filters?.reduce(
      (obj, item) =>
        Object.assign(obj, {
          [item.column.value]: item.type.value + ':' + item.value,
        }),
      {},
    );

    // console.log('aaaa', filters);
    setFetchingForPipeline(true);
    dispatch(
      pipelinesActions.getMy({
        page: page,
        size: size,
        filtersParam,
        // name: name ? name : '',
        project: selectedProject,
        onSuccess: () => setFetchingForPipeline(false),
        onFailure: () => setFetchingForPipeline(false),
      }),
    );
  }

  const setFetchingForPipeline = (fetching: boolean) => {
    dispatch(pipelinePagesActions.setFetching({ fetching }));
  };

  return {
    setFetchingForPipeline,
    dispatchPipelineData,
  };
};

export const callActionForAllrunsForPagination = () => {
  const dispatch = useDispatch();
  const selectedProject = useSelector(projectSelectors.selectedProject);

  function dispatchAllrunsData(page: number, size: number, filters?: any[]) {
    let filtersParam = filters?.reduce(
      (obj, item) =>
        Object.assign(obj, {
          [item.column.value]: item.type.value + ':' + item.value,
        }),
      {},
    );

    // console.log('aaaa', filters);
    setFetchingForAllRuns(true);
    dispatch(
      runsActions.allRuns({
        project: selectedProject,
        page: page,
        size: size,
        filtersParam,
        onSuccess: () => setFetchingForAllRuns(false),
        onFailure: () => setFetchingForAllRuns(false),
      }),
    );
  }

  const setFetchingForAllRuns = (fetching: boolean) => {
    dispatch(runPagesActions.setFetching({ fetching }));
  };

  return {
    setFetchingForAllRuns,
    dispatchAllrunsData,
  };
};
