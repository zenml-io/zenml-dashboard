/* eslint-disable */

import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pipelinePagesActions } from '../../../../../redux/actions';
import {
  pipelinePagesSelectors,
  pipelineSelectors,
} from '../../../../../redux/selectors';

interface ServiceInterface {
  openPipelineIds: TId[];
  setOpenPipelineIds: (ids: TId[]) => void;
  fetching: boolean;
  filteredPipelines: TPipeline[];
  setSelectedRunIds: (ids: TId[]) => void;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();

  const [openPipelineIds, setOpenPipelineIds] = useState<TId[]>([]);
  const [filteredPipelines, setFilteredPipelines] = useState<TPipeline[]>([]);

  const fetching = useSelector(pipelinePagesSelectors.fetching);

  const currentWorkspace = useSelector(pipelinePagesSelectors.currentWorkspace);

  const pipelines = useSelector(pipelineSelectors.myPipelines);

  useEffect(() => {
    const orderedPipelines = _.sortBy(pipelines, (pipeline: TPipeline) =>
      new Date(pipeline.createdAt).getTime(),
    ).reverse();

    const filteredPipelines = orderedPipelines.filter(
      (pipeline: TPipeline) =>
        currentWorkspace && pipeline.projectName === currentWorkspace.id,
    );

    setFilteredPipelines(filteredPipelines);
  }, []);

  const setSelectedRunIds = (runIds: TId[]) => {
    dispatch(pipelinePagesActions.setSelectedRunIds({ runIds }));
  };

  return {
    openPipelineIds,
    setOpenPipelineIds,
    fetching,
    filteredPipelines,
    setSelectedRunIds,
  };
};
