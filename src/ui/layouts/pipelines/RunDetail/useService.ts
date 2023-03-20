import { useEffect, useState } from 'react';
import { RunDetailRouteParams } from '.';
import { runsActions } from '../../../../redux/actions';
import { runSelectors, sessionSelectors } from '../../../../redux/selectors';
import { useDispatch, useParams, useSelector } from '../../../hooks';
import axios from 'axios';

interface ServiceInterface {
  runId: TId;
  pipelineId: TId;
  run: TRun;
  fetching: boolean;
  metadata: any;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { id, pipelineId } = useParams<RunDetailRouteParams>();
  const [isMounted, setIsMounted] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [metadata, setMetaData] = useState([] as any);
  const authToken = useSelector(sessionSelectors.authenticationToken);
  useEffect(() => {
    if (!isMounted) {
      setFetching(true);

      dispatch(
        runsActions.runForId({
          pipelineId: pipelineId,
          runId: id,
          onSuccess: () =>
            dispatch(
              runsActions.graphForRun({
                runId: id,
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
  const fetchMetaData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/run-metadata?pipeline_run_id=${id}&key=orchestrator_url`,
      {
        headers: {
          Authorization: `bearer ${authToken}`,
        },
      },
    );

    setMetaData(response?.data?.items); //Setting the response into state
  };

  const run = useSelector(runSelectors.runForId(id));

  // const setFetching = (fetching: boolean) => {
  //   dispatch(runPagesActions.setFetching({ fetching }));
  // };
  // const fetching = useSelector(runPagesSelectors.fetching);

  return { runId: id, pipelineId, run, fetching, metadata };
};
