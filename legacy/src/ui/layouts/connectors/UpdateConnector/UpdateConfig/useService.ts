import { useSelector } from 'react-redux';
import { connectorSelectors } from '../../../../../redux/selectors';
import { ServiceConnector } from '../../../../../api/types';

interface ServiceInterface {
  connector: any;
}

export const useService = ({
  connectorId,
}: {
  connectorId: TId;
}): ServiceInterface => {
  const connector: ServiceConnector = useSelector(
    connectorSelectors.connectorForId(connectorId),
  );

  return { connector };
};
