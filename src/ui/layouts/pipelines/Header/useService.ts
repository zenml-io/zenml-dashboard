import { useSelector } from 'react-redux';
import { pipelinePagesSelectors } from '../../../../redux/selectors';

interface ServiceInterface {
  selectedRunIds: TId[];
  currentWorkspace: TWorkspace | null;
}

export const useService = (): ServiceInterface => {
  const currentWorkspace = useSelector(pipelinePagesSelectors.currentWorkspace);
  const selectedRunIds = useSelector(pipelinePagesSelectors.selectedRunIds);

  return {
    selectedRunIds,
    currentWorkspace,
  };
};
