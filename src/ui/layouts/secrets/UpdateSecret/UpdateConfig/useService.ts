import { useSelector } from 'react-redux';
import { secretSelectors } from '../../../../../redux/selectors';

interface ServiceInterface {
  secret: any;
}

export const useService = ({
  secretId,
}: {
  secretId: TId;
}): ServiceInterface => {
  const secret: TStack = useSelector(secretSelectors.secretForId(secretId));

  return { secret };
};
