import React from 'react';
// import { translate } from './translate';
import { ListForAll } from './ListForAll';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useService } from './useService';
import { useLocationPath, useSelector } from '../../../hooks';

import { camelCaseToParagraph } from '../../../../utils';
// import { workspaceSelectors } from '../../../../redux/selectors';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
import { workspaceSelectors } from '../../../../redux/selectors';

export const RegisterComponents: React.FC = () => {
  const locationPath = useLocationPath();
  const { setFetching } = useService();
  console.log(setFetching);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  // const url_string = window.location.href;
  // const url = new URL(url_string);
  // const workspaceName = url.pathname.split('/')[2];

  const workspace = selectedWorkspace
    ? selectedWorkspace
    : DEFAULT_WORKSPACE_NAME;
  // debugger;
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
      // tabBasePath={
      //   routePaths.stackComponents.base('', workspace) + `?workspace=${workspace}`
      // }
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
