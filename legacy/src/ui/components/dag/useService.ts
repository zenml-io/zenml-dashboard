import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { runSelectors } from '../../../redux/selectors';
// import { runsActions } from '../../../redux/actions';

export const useService = ({
  runId,
  togglePolling,
  runStatus,
}: {
  runId: TId;
  togglePolling: boolean;
  runStatus?: string;
}) => {
  const dispatch = useDispatch();
  const graph = useSelector(runSelectors.graphByRunId(runId));
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    // This is important
  }, [runId, dispatch]);

  return { graph, counter };
};
