import { useEffect, useState } from 'react';
import { RunDetailRouteParams } from '.';
import { runsActions } from '../../../../redux/actions';

import { runSelectors } from '../../../../redux/selectors';
import { useDispatch, useParams, useSelector } from '../../../hooks';

interface ServiceInterface {
  runId: TId;
  run: TRun;
  fetching: boolean;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { runId } = useParams<RunDetailRouteParams>();
  const [isMounted, setIsMounted] = useState(false);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    if (!isMounted) {
      setFetching(true);

      dispatch(
        runsActions.runForId({
          runId: runId,
          onSuccess: () =>
            dispatch(
              runsActions.graphForRun({
                runId: runId,
                onSuccess: () => setFetching(false),
                onFailure: () => setFetching(false),
              }),
            ),
          onFailure: () => setFetching(false),
        }),
      );
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, setIsMounted]);

  // const fetching = useSelector(runPagesSelectors.fetching);
  // const setFetching = (fetching: boolean) => {
  //   dispatch(runPagesActions.setFetching({ fetching }));
  // };

  const run: TRun = useSelector(runSelectors.runForId(runId));

  return { runId: runId, run, fetching };
};
