import { useSelector } from 'react-redux';
import { runSelectors } from '../../../../../redux/selectors';


export const useService = ({ runId }: { runId: TId }) => {

  const run = useSelector(runSelectors.runForId(runId));
  const artifactData = useSelector(runSelectors.artifactData)
  const stepData = useSelector(runSelectors.stepData)

  return { artifactData, stepData, run };
};
