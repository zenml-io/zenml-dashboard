import { useEffect } from 'react';
import { RunDetailRouteParams } from '.';
import { billingActions, runsActions } from '../../../../redux/actions';
import { billingSelectors, runSelectors } from '../../../../redux/selectors';
import {
  useDispatch,
  useParams,
  useRequestOnMount,
  useSelector,
} from '../../../hooks';

interface ServiceInterface {
  runId: TId;
  pipelineId: TId;
  run: TRun;
  billing: TBilling | Record<any, any>;
}

export const useService = (): ServiceInterface => {
  const { id, pipelineId } = useParams<RunDetailRouteParams>();
  const dispatch = useDispatch();
  // useRequestOnMount(() =>
  //   runsActions.runForId({
  //     pipelineId,
  //     runId: id,
  //   }),
  // );
  useRequestOnMount(() =>
    runsActions.graphForRun({
      runId: id,
    }),
  );
  const run = useSelector(runSelectors.runForId(id));

  // useRequestOnMount(() =>
  //   billingActions.billingForRunId({
  //     runId: id,
  //     pipelineId,
  //   }),
  // );

  const billing = useSelector(billingSelectors.billingForRunId(id));

  return { runId: id, pipelineId, run, billing };
};
