import { RunDetailRouteParams } from '.';
// import { runsActions, billingActions } from '../../../../redux/actions';
import { billingSelectors, runSelectors } from '../../../../redux/selectors';
import { useParams, useSelector } from '../../../hooks';

interface ServiceInterface {
  runId: TId;
  run: TRun;
  billing: TBilling | Record<any, any>;
}

export const useService = (): ServiceInterface => {
  const { id } = useParams<RunDetailRouteParams>();
  // debugger;
  // useRequestOnMount(() =>
  //   runsActions.runForId({
  //     pipelineId,
  //     runId: id,
  //   }),
  // );

  // useRequestOnMount(() =>
  //   billingActions.billingForRunId({
  //     runId: id,
  //     pipelineId,
  //   }),
  // );

  const run = useSelector(runSelectors.runForId(id));
  const billing = useSelector(billingSelectors.billingForRunId(id));

  return { runId: id, run, billing };
};
