import React from 'react';

import { ListForAll } from './ListForAll';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useService } from './useService';
import { useLocationPath, useSelector } from '../../../hooks';

import { camelCaseToParagraph } from '../../../../utils';

import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
import { workspaceSelectors } from '../../../../redux/selectors';

export const RegisterComponents: React.FC = () => {
  const locationPath = useLocationPath();
  useService();

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const workspace = selectedWorkspace
    ? selectedWorkspace
    : DEFAULT_WORKSPACE_NAME;

  return (
    <BasePage
      fromRegisterComponent={true}
      tabPages={[
        {
          text: camelCaseToParagraph(locationPath.split('/')[4]),
          Component: () => (
            <ListForAll type={locationPath.split('/')[4]}></ListForAll>
          ),
          path: routePaths.stackComponents.registerComponents(
            locationPath.split('/')[4],
            selectedWorkspace
              ? selectedWorkspace
              : (locationPath.split('/')[2] as string),
          ),
        },
      ]}
      tabBasePath={
        routePaths.stackComponents.registerComponents(
          locationPath.split('/')[4],
          selectedWorkspace
            ? selectedWorkspace
            : (locationPath.split('/')[2] as string),
        ) + `?workspace=${workspace}`
      }
      breadcrumbs={[
        {
          name: camelCaseToParagraph(locationPath.split('/')[4]),
          clickable: true,
          to:
            routePaths.stackComponents.registerComponents(
              locationPath.split('/')[4],
              workspace as string,
            ) + `?workspace=${workspace}`,
        },
      ]}
      title="Register a Stack Component"
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default RegisterComponents;
