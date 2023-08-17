import React from 'react';

import { ListForAll } from './ListForAll';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useLocationPath, useSelector } from '../../../hooks';
import { workspaceSelectors } from '../../../../redux/selectors';
import { useService } from './useService';

export const ConnectorTypes: React.FC = () => {
  const locationPath = useLocationPath();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  // eslint-disable-next-line no-empty-pattern
  const {} = useService();

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
