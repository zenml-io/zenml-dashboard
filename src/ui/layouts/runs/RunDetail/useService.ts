import { useEffect, useState } from 'react';
import { RunDetailRouteParams } from '.';
import { runsActions } from '../../../../redux/actions';

import { runSelectors, sessionSelectors } from '../../../../redux/selectors';
import { useDispatch, useParams, useSelector } from '../../../hooks';
import axios from 'axios';

interface ServiceInterface {
  runId: TId;
  run: TRun;
  fetching: boolean;
  metadata: any;
  graph?: any;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { runId } = useParams<RunDetailRouteParams>();
  const [isMounted, setIsMounted] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [metadata, setMetaData] = useState([] as any);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const graph = useSelector(runSelectors.graphByRunId(runId));
  const run: TRun = useSelector(runSelectors.runForId(runId));
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
                onSuccess: () => {
                  setFetching(false);
                  fetchMetaData();
                },
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
  useEffect(() => {
    if (run.status === 'running') {
      const intervalId = setInterval(() => {
        dispatch(
          runsActions.runForId({
            runId: runId,
            onSuccess: (res) => {
              if (res.status !== 'running') {
                dispatch(
                  runsActions.graphForRun({
                    runId: runId,
                  }),
                );
              }
            },
          }),
        );
      }, 5000);

      return () => {
        clearInterval(intervalId);
      };
    }
    // This is important
  }, [runId, run, dispatch]);

  const fetchMetaData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/run-metadata?pipeline_run_id=${runId}&key=orchestrator_url`,
      {
        headers: {
          Authorization: `bearer ${authToken}`,
        },
      },
    );

    setMetaData(response?.data?.items); //Setting the response into state
  };

  return { runId: runId, run, fetching, metadata, graph };
};
