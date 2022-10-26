// import { useEffect } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { runSelectors } from '../../../redux/selectors';

export const useService = ({ runId }: { runId: TId }) => {
  const graph = useSelector(runSelectors.graphByRunId(runId));

  useEffect(() => {}, [graph]);

  return { graph };
};
