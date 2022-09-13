import { useSelector } from 'react-redux';
import { stackPagesSelectors } from '../../../../redux/selectors';

interface ServiceInterface {
  selectedRunIds: TId[];
  currentWorkspace: TWorkspace | null;
}

export const useService = (): ServiceInterface => {
  const currentWorkspace = useSelector(stackPagesSelectors.currentWorkspace);
  const selectedRunIds = useSelector(stackPagesSelectors.selectedRunIds);

  return {
    selectedRunIds,
    currentWorkspace,
  };
};
