// import { useEffect } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { runSelectors } from '../../../redux/selectors';
import { runsActions } from '../../../redux/actions';

export const useService = ({
  runId,
  togglePolling,
}: {
  runId: TId;
  togglePolling: boolean;
}) => {
  const dispatch = useDispatch();
  const graph = useSelector(runSelectors.graphByRunId(runId));
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    if (togglePolling) {
      setCounter(10);
    }
    if (!togglePolling) {
      const counterInterval = setInterval(() => {
        setCounter((prevCounter) => {
          // Reset the counter to 1 after reaching 10
          if (prevCounter === 0) return 10;
          // Otherwise, continue incrementing
          return prevCounter - 1;
        });
      }, 1000);
      const intervalId = setInterval(() => {
        dispatch(
          runsActions.graphForRun({
            runId: runId,
          }),
        );
      }, 11000);

      return () => {
        clearInterval(intervalId);
        clearInterval(counterInterval);
      };
    }
    // This is important
  }, [runId, dispatch, togglePolling]);

  return { graph, counter };
};
