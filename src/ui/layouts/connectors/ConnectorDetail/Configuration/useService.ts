import { useSelector } from 'react-redux';
import { connectorSelectors } from '../../../../../redux/selectors';

interface ServiceInterface {
  connector: any;
}

export const useService = ({
  connectorId,
}: {
  connectorId: TId;
}): ServiceInterface => {
  const connector: TStack = useSelector(
    connectorSelectors.connectorForId(connectorId),
  );

  return { connector };
};
