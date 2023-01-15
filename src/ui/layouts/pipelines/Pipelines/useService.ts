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

import { filterObjectForParam } from '../../../../utils';
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
        sort_by: 'created',
        logical_operator: 'and',
        project: selectedProject,
        page: 1,
        size: 5,
        onSuccess: () => setFetchingForAllRuns(false),
        onFailure: () => setFetchingForAllRuns(false),
      }),
    );
    dispatch(
      pipelinesActions.getMy({
        sort_by: 'created',
        logical_operator: 'and',
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
    let filtersParam: any = filterObjectForParam(filters);
    setFetchingForPipeline(true);

    dispatch(
      pipelinesActions.getMy({
        sort_by: 'created',
        logical_operator: Object.keys(filtersParam).length > 1 ? 'or' : 'and',
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
    let filtersParam = filterObjectForParam(filters);

    setFetchingForAllRuns(true);
    dispatch(
      runsActions.allRuns({
        project: selectedProject,
        sort_by: 'created',
        logical_operator: Object.keys(filtersParam).length > 1 ? 'or' : 'and',
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
