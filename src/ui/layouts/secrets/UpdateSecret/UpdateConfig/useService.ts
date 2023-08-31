import { useSelector } from 'react-redux';
import { secretSelectors } from '../../../../../redux/selectors';
import { Secret } from '../../../../../api/types';

interface ServiceInterface {
  secret: Secret;
}

export const useService = ({
  secretId,
}: {
  secretId: TId;
}): ServiceInterface => {
  const secret: Secret = useSelector(secretSelectors.secretForId(secretId));

  return { secret };
};
