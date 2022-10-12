import { useEffect } from 'react';
import { RunDetailRouteParams } from '.';
import { runPagesActions, runsActions } from '../../../../redux/actions';
import { billingSelectors, runSelectors } from '../../../../redux/selectors';
import {
  useDispatch,
  useParams,
  useRequestOnMount,
  useSelector,
} from '../../../hooks';

interface ServiceInterface {
  runId: TId;
  stackId: TId;
  run: TRun;
  billing: TBilling | Record<any, any>;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { id, stackId } = useParams<RunDetailRouteParams>();

  // useRequestOnMount(() =>
  //   runsActions.runForId({
  //     pipelineId,
  //     runId: id,
  //   }),
  // );
  useRequestOnMount(() =>
    runsActions.graphForRun({
      runId: id,
      onSuccess: () => setFetching(false),
      onFailure: () => setFetching(false),
    }),
  );

  // useEffect(() => {
  //   setFetching(true);

  //   dispatch(
  //     runsActions.graphForRun({
  //       runId: id,
  //       onSuccess: () => setFetching(false),
  //       onFailure: () => setFetching(false),
  //     }),
  //   );
  // }, [id]);
  const setFetching = (fetching: boolean) => {
    dispatch(runPagesActions.setFetching({ fetching }));
  };

  const run = useSelector(runSelectors.runForId(id));
  const billing = useSelector(billingSelectors.billingForRunId(id));

  return { runId: id, stackId, run, billing };
};
