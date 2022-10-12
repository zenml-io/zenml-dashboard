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
  stackComponentId: TId;
  run: TRun;
  billing: TBilling | Record<any, any>;
  type: string;
  fetching: boolean;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { type, stackComponentId, id } = useParams<RunDetailRouteParams>();
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
  const run = useSelector(runSelectors.runForId(id));
  const billing = useSelector(billingSelectors.billingForRunId(id));

  return { type, runId: id, stackComponentId, run, billing, fetching };
};
