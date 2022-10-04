import { RunDetailRouteParams } from '.';
import { runsActions } from '../../../../redux/actions';
// import { runsActions, billingActions } from '../../../../redux/actions';
import { billingSelectors, runSelectors } from '../../../../redux/selectors';
import { useParams, useRequestOnMount, useSelector } from '../../../hooks';

interface ServiceInterface {
  runId: TId;
  stackId: TId;
  run: TRun;
  billing: TBilling | Record<any, any>;
}

export const useService = (): ServiceInterface => {
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
    }),
  );

  // useRequestOnMount(() =>
  //   billingActions.billingForRunId({
  //     runId: id,
  //     pipelineId,
  //   }),
  // );

  const run = useSelector(runSelectors.runForId(id));
  const billing = useSelector(billingSelectors.billingForRunId(id));

  return { runId: id, stackId, run, billing };
};
