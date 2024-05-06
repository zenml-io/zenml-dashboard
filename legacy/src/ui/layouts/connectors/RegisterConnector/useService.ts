/* eslint-disable */

import { useParams, useSelector } from '../../../hooks';

import { connectorSelectors } from '../../../../redux/selectors';

import { ConnectorDetailRouteParams } from '.';

interface ServiceInterface {
  connectorType: any;
  type: string;
}

export const useService = (): ServiceInterface => {
  const { type } = useParams<ConnectorDetailRouteParams>();
  const connectorTypes: any = useSelector(connectorSelectors.myConnectorsTypes);
  const connectorType = connectorTypes.find(
    (obj: any) => obj.connectorType === type,
  );
  return {
    type,
    connectorType,
  };
};
