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
  stackId: TId;
  run: TRun;
  billing: TBilling | Record<any, any>;
  fetching: boolean;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { id, stackId } = useParams<RunDetailRouteParams>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setFetching(true);
      dispatch(
        runsActions.runForId({
          stackId: stackId,
          runId: id,
          onSuccess: () => setFetching(false),
          onFailure: () => setFetching(false),
        }),
      );
      dispatch(
        runsActions.graphForRun({
          runId: id,
          onSuccess: () => setFetching(false),
          onFailure: () => setFetching(false),
        }),
      );
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, setIsMounted]);

  const fetching = useSelector(runPagesSelectors.fetching);
  const setFetching = (fetching: boolean) => {
    dispatch(runPagesActions.setFetching({ fetching }));
  };

  const run = useSelector(runSelectors.runForId(id));
  const billing = useSelector(billingSelectors.billingForRunId(id));

  return { runId: id, stackId, run, billing, fetching };
};
