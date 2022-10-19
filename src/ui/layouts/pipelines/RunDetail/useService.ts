import { useEffect, useState } from 'react';
import { RunDetailRouteParams } from '.';
import { runPagesActions, runsActions } from '../../../../redux/actions';
import {
  billingSelectors,
  runPagesSelectors,
  runSelectors,
} from '../../../../redux/selectors';
import { useDispatch, useParams, useSelector } from '../../../hooks';

interface ServiceInterface {
  runId: TId;
  pipelineId: TId;
  run: TRun;
  billing: TBilling | Record<any, any>;
  fetching: boolean;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { id, pipelineId } = useParams<RunDetailRouteParams>();
  const [isMounted, setIsMounted] = useState(false);
  // useRequestOnMount(() =>
  //   runsActions.runForId({
  //     pipelineId,
  //     runId: id,
  //   }),
  // );

  useEffect(() => {
    if (!isMounted) {
      setFetching(true);
      dispatch(
        runsActions.graphForRun({
          runId: id,
          onSuccess: () => setFetching(false),
          onFailure: () => setFetching(false),
        }),
      );
      dispatch(
        runsActions.runForId({
          pipelineId: pipelineId,
          runId: id,
          onSuccess: () => setFetching(false),
          onFailure: () => setFetching(false),
        }),
      );
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, setIsMounted]);
  // useRequestOnMount(() =>
  //   runsActions.graphForRun({
  //     runId: id,
  //     onSuccess: () => setFetching(false),
  //     onFailure: () => setFetching(false),
  //   }),
  // );
  // useEffect(() => {
  //   dispatch(
  //     runsActions.graphForRun({
  //       runId: id,

  //     }),
  //   );
  // });
  const run = useSelector(runSelectors.runForId(id));

  // useRequestOnMount(() =>
  //   billingActions.billingForRunId({
  //     runId: id,
  //     pipelineId,
  //   }),
  // );
  const setFetching = (fetching: boolean) => {
    dispatch(runPagesActions.setFetching({ fetching }));
  };
  const fetching = useSelector(runPagesSelectors.fetching);

  const billing = useSelector(billingSelectors.billingForRunId(id));

  return { runId: id, pipelineId, run, billing, fetching };
};
