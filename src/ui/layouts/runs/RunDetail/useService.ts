import { useEffect, useState } from 'react';
import { RunDetailRouteParams } from '.';
import { runPagesActions, runsActions } from '../../../../redux/actions';
// import { runsActions, billingActions } from '../../../../redux/actions';
import {
  billingSelectors,
  runPagesSelectors,
  runSelectors,
} from '../../../../redux/selectors';
import {
  useDispatch,
  useParams,
  useRequestOnMount,
  useSelector,
} from '../../../hooks';

interface ServiceInterface {
  runId: TId;
  run: TRun;
  billing: TBilling | Record<any, any>;
  fetching: boolean;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { id, runId } = useParams<RunDetailRouteParams>();
  const [isMounted, setIsMounted] = useState(false);
  // debugger;
  // useRequestOnMount(() =>
  //   runsActions.runForId({
  //     pipelineId,
  //     runId: id,
  //   }),
  // );
  // useRequestOnMount(() =>
  //   runsActions.graphForRun({
  //     runId: runId,
  //   }),
  // );

  useEffect(() => {
    if (!isMounted) {
      setFetching(true);
      dispatch(
        runsActions.graphForRun({
          runId: runId,
          onSuccess: () => setFetching(false),
          onFailure: () => setFetching(false),
        }),
      );
      setIsMounted(true);
    }
  }, [isMounted, setIsMounted]);

  // useRequestOnMount(() =>
  //   billingActions.billingForRunId({
  //     runId: id,
  //     pipelineId,
  //   }),
  // );
  const fetching = useSelector(runPagesSelectors.fetching);
  const setFetching = (fetching: boolean) => {
    dispatch(runPagesActions.setFetching({ fetching }));
  };

  const run: TRun = useSelector(runSelectors.runForId(runId));

  const billing = useSelector(billingSelectors.billingForRunId(id));

  return { runId: runId, run, billing, fetching };
};
