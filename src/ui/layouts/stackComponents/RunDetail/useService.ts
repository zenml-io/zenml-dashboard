import { RunDetailRouteParams } from '.';
import { runsActions } from '../../../../redux/actions';
// import { runsActions, billingActions } from '../../../../redux/actions';
import { billingSelectors, runSelectors } from '../../../../redux/selectors';
import { useParams, useRequestOnMount, useSelector } from '../../../hooks';

interface ServiceInterface {
  runId: TId;
  stackComponentId: TId;
  run: TRun;
  billing: TBilling | Record<any, any>;
  type: string;
}

export const useService = (): ServiceInterface => {
  const { type, stackComponentId, id } = useParams<RunDetailRouteParams>();
  // debugger;
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

  return { type, runId: id, stackComponentId, run, billing };
};
