import { useSelector } from 'react-redux';
import { stackPagesSelectors } from '../../../../redux/selectors';

interface ServiceInterface {
  selectedRunIds: TId[];
}

export const useService = (): ServiceInterface => {
  const selectedRunIds = useSelector(stackPagesSelectors.selectedRunIds);

  return {
    selectedRunIds,
  };
};
