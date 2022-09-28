/* eslint-disable */

import { StackDetailRouteParams } from '.';
import { pipelinesActions, stacksActions } from '../../../../redux/actions';
import { stackSelectors } from '../../../../redux/selectors';
import { useParams, useSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { stackPagesActions } from '../../../../redux/actions';
import { useEffect } from 'react';

interface ServiceInterface {
  stack: TStack;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { id } = useParams<StackDetailRouteParams>();

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
      stacksActions.allRunsByStackId({
        stackId: id,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [id]);

  const setFetching = (fetching: boolean) => {
    dispatch(stackPagesActions.setFetching({ fetching }));
  };

  const stack = useSelector(stackSelectors.stackForId(id));

  return { stack };
};
