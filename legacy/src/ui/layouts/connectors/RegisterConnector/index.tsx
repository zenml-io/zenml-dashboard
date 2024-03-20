import React, { useEffect, useState } from 'react';

import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useService } from './useService';
import { useLocation, useLocationPath, useSelector } from '../../../hooks';

import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
import { workspaceSelectors } from '../../../../redux/selectors';
import { CreateConnector } from './CreateConnector';

export interface ConnectorDetailRouteParams {
  type: string;
}
export const RegisterComponents: React.FC = () => {
  const locationPath = useLocationPath();
  const { type, connectorType } = useService();

  const location = useLocation();
  const [routeState, setRouteState] = useState({}) as any;
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  useEffect(() => {
    setRouteState(location.state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRouteState]);

  const workspace = selectedWorkspace
    ? selectedWorkspace
    : DEFAULT_WORKSPACE_NAME;

  return (
    <BasePage
      fromConfigureComponent={true}
      tabPages={[
        {
          text: 'asd',
          Component: () => (
            <CreateConnector state={routeState} connectorType={connectorType} />
          ),
          path: routePaths.connectors.registerConnectors(
            type,

            selectedWorkspace
              ? selectedWorkspace
              : (locationPath.split('/')[2] as string),
          ),
        },
      ]}
      tabBasePath={routePaths.connectors.registerConnectors(
        type,

        selectedWorkspace
          ? selectedWorkspace
          : (locationPath.split('/')[2] as string),
      )}
      breadcrumbs={[
        {
          name: 'Service Connectors',
          clickable: true,
          to: routePaths.connectors.connectorTypes(workspace as string),
        },
        {
          name: type,
          clickable: true,
          to: routePaths.connectors.registerConnectors(
            type,

            selectedWorkspace
              ? selectedWorkspace
              : (locationPath.split('/')[2] as string),
          ),
        },
      ]}
      title="Service Connector"
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default RegisterComponents;
