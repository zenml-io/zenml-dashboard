import React from 'react';
// import { translate } from './translate';
import { ListForAll } from './ListForAll';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useLocationPath, useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';

// import { camelCaseToParagraph } from '../../../../utils';
// import { workspaceSelectors } from '../../../../redux/selectors';
// import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
// import { workspaceSelectors } from '../../../../redux/selectors';

export const ConnectorTypes: React.FC = () => {
  const locationPath = useLocationPath();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  // const { setFetching } = useService();

  // const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  // const url_string = window.location.href;
  // const url = new URL(url_string);
  // const workspaceName = url.pathname.split('/')[2];

  //   camelCaseToParagraph(locationPath.split('/')[4])

  // const workspace = selectedWorkspace
  //   ? selectedWorkspace
  //   : DEFAULT_WORKSPACE_NAME;
  // debugger;
  return (
    <BasePage
      fromRegisterComponent={true}
      tabPages={[
        {
          text: 'create service connector',
          Component: () => (
            <ListForAll type={locationPath.split('/')[4]}></ListForAll>
          ),
          path: routePaths.connectors.connectorTypes(
            selectedWorkspace
              ? selectedWorkspace
              : (locationPath.split('/')[2] as string),
          ),
          // path: routePaths.connectors.registerConnectors(
          //   locationPath.split('/')[4],
          //   selectedWorkspace
          //     ? selectedWorkspace
          //     : (locationPath.split('/')[2] as string),
          // ),
        },
      ]}
      tabBasePath={routePaths.connectors.connectorTypes(
        locationPath.split('/')[4],
      )}
      breadcrumbs={[
        {
          name: 'Service Connectors',
          clickable: true,
          to: routePaths.connectors.base,
        },
      ]}
      title="Service Connectors"
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default ConnectorTypes;
