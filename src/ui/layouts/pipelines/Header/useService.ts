import { useSelector } from 'react-redux';
import { pipelinePagesSelectors } from '../../../../redux/selectors';

interface ServiceInterface {
  selectedRunIds: TId[];
}

export const useService = (): ServiceInterface => {
  const selectedRunIds = useSelector(pipelinePagesSelectors.selectedRunIds);

  return {
    selectedRunIds,
  };
};
