/* eslint-disable */

import { PipelineDetailRouteParams } from '.';
import { pipelinesActions } from '../../../../redux/actions';
import { pipelineSelectors } from '../../../../redux/selectors';
import { useParams, useSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { pipelinePagesActions } from '../../../../redux/actions';
import { useEffect } from 'react';

interface ServiceInterface {
  pipeline: TPipeline;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { id } = useParams<PipelineDetailRouteParams>();

  useEffect(() => {
    setFetching(true);
    // Legacy: previously runs was in pipeline
    // dispatch(
    //   pipelinesActions.pipelineForId({
    //     pipelineId: id,
    //     onSuccess: () => setFetching(false),
    //     onFailure: () => setFetching(false),
    //   }),
    // );
    dispatch(
      pipelinesActions.allRunsByPipelineId({
        pipelineId: id,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [id]);

  const setFetching = (fetching: boolean) => {
    dispatch(pipelinePagesActions.setFetching({ fetching }));
  };

  const pipeline = useSelector(pipelineSelectors.pipelineForId(id));

  return { pipeline };
};
