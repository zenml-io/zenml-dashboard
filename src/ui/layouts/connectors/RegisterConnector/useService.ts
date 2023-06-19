/* eslint-disable */

import { useEffect } from 'react';
import { flavorsActions, flavorPagesActions } from '../../../../redux/actions';
// import { workspaceSelectors } from '../../../../redux/selectors';
import {
  useDispatch,
  useLocationPath,
  useParams,
  useSelector,
} from '../../../hooks';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
import {
  connectorSelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import { filterObjectForParam } from '../../../../utils';
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
