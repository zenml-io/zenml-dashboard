import { useEffect, useState } from 'react';
import { RunDetailRouteParams } from '.';
import { runsActions } from '../../../../redux/actions';
import { runSelectors } from '../../../../redux/selectors';
import { useDispatch, useParams, useSelector } from '../../../hooks';

interface ServiceInterface {
  runId: TId;
  stackComponentId: TId;
  run: TRun;
  type: string;
  fetching: boolean;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { type, stackComponentId, id } = useParams<RunDetailRouteParams>();
  const [isMounted, setIsMounted] = useState(false);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    if (!isMounted) {
      setFetching(true);
      dispatch(
        runsActions.runForId({
          stackComponentId: stackComponentId,
          runId: id,
          onSuccess: () =>
            dispatch(
              runsActions.graphForRun({
                runId: id,
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
  const run = useSelector(runSelectors.runForId(id));

  return { type, runId: id, stackComponentId, run, fetching };
};
