/* eslint-disable */

import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  pipelinePagesActions,
  stackPagesActions,
} from '../../../../../redux/actions';
import {
  pipelinePagesSelectors,
  pipelineSelectors,
  stackPagesSelectors,
  stackSelectors,
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

  const fetching = useSelector(stackPagesSelectors.fetching);

  const currentWorkspace = useSelector(stackPagesSelectors.currentWorkspace);

  const pipelines = useSelector(stackSelectors.mystacks);

  useEffect(() => {
    const orderedPipelines = _.sortBy(pipelines, (pipeline: TPipeline) =>
      new Date(pipeline.createdAt).getTime(),
    ).reverse();

    // const filteredPipelines = orderedPipelines.filter(
    //   (pipeline: TPipeline) =>
    //     currentWorkspace && pipeline.projectName === currentWorkspace.id,
    // );
    // debugger;
    setFilteredPipelines(orderedPipelines);
  }, []);

  const setSelectedRunIds = (runIds: TId[]) => {
    dispatch(stackPagesActions.setSelectedRunIds({ runIds }));
  };

  return {
    openPipelineIds,
    setOpenPipelineIds,
    fetching,
    filteredPipelines,
    setSelectedRunIds,
  };
};
