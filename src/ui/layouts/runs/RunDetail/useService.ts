import { RunDetailRouteParams } from '.';
import { runsActions } from '../../../../redux/actions';
// import { runsActions, billingActions } from '../../../../redux/actions';
import { billingSelectors, runSelectors } from '../../../../redux/selectors';
import { useParams, useRequestOnMount, useSelector } from '../../../hooks';

interface ServiceInterface {
  runId: TId;
  run: TRun;
  billing: TBilling | Record<any, any>;
}

export const useService = (): ServiceInterface => {
  const { id, runId } = useParams<RunDetailRouteParams>();

  // debugger;
  // useRequestOnMount(() =>
  //   runsActions.runForId({
  //     pipelineId,
  //     runId: id,
  //   }),
  // );
  useRequestOnMount(() =>
    runsActions.graphForRun({
      runId: runId,
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

  return { runId: runId, run, billing };
};
