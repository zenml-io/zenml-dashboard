import React, { useEffect, useState } from 'react';
// import { translate } from './translate';
// import { ListForAll } from './ListForAll';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useService } from './useService';
import { useLocation, useLocationPath, useSelector } from '../../../hooks';

// import { camelCaseToParagraph } from '../../../../utils';
// import { workspaceSelectors } from '../../../../redux/selectors';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
import { workspaceSelectors } from '../../../../redux/selectors';
import { CreateConnector } from './CreateConnector';

export interface ConnectorDetailRouteParams {
  type: string;
}
export const RegisterComponents: React.FC = () => {
  const locationPath = useLocationPath();
  const { type, connectorType } = useService();
  console.log(type, '2232123s');
  // console.log(setFetching);
  const location = useLocation();
  const [routeState, setRouteState] = useState({}) as any;
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  useEffect(() => {
    setRouteState(location.state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRouteState]);
  // const url_string = window.location.href;
  // const url = new URL(url_string);
  // const workspaceName = url.pathname.split('/')[2];

  const workspace = selectedWorkspace
    ? selectedWorkspace
    : DEFAULT_WORKSPACE_NAME;
  // const titleCase = (s: any) =>
  //   s.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
  //     c ? c.toUpperCase() : ' ' + d.toUpperCase(),
  //   );
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
      // tabBasePath={
      //   routePaths.stackComponents.base('', workspace) + `?workspace=${workspace}`
      // }
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
