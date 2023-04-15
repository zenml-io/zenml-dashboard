import React, { useEffect, useState } from 'react';
// import { translate } from './translate';
// import { ListForAll } from './ListForAll';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useService } from './useService';
import { useLocation, useLocationPath, useSelector } from '../../../hooks';

import { camelCaseToParagraph } from '../../../../utils';
// import { workspaceSelectors } from '../../../../redux/selectors';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
import { workspaceSelectors } from '../../../../redux/selectors';
import { CreateComponent } from './CreateComponent';

export interface FlavorDetailRouteParams {
  id: TId;
}
export const RegisterComponents: React.FC = () => {
  const locationPath = useLocationPath();
  const { id, flavor } = useService();
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
  console.log(id, 'asdasdasdsadasddas111');
  const workspace = selectedWorkspace
    ? selectedWorkspace
    : DEFAULT_WORKSPACE_NAME;
  const titleCase = (s: any) =>
    s.replace(/^_*(.)|_+(.)/g, (s: any, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase(),
    );
  return (
    <BasePage
      fromConfigureComponent={true}
      tabPages={[
        {
          text: camelCaseToParagraph(locationPath.split('/')[4]),
          Component: () => (
            <CreateComponent state={routeState} flavor={flavor} />
          ),
          path: routePaths.stackComponents.configureComponent(
            locationPath.split('/')[4],

            selectedWorkspace
              ? selectedWorkspace
              : (locationPath.split('/')[2] as string),
            id,
          ),
        },
      ]}
      // tabBasePath={
      //   routePaths.stackComponents.base('', workspace) + `?workspace=${workspace}`
      // }
      tabBasePath={routePaths.stackComponents.configureComponent(
        locationPath.split('/')[4],

        selectedWorkspace
          ? selectedWorkspace
          : (locationPath.split('/')[2] as string),
        id,
      )}
      breadcrumbs={[
        {
          name: camelCaseToParagraph(locationPath.split('/')[4]),
          clickable: true,
          to: routePaths.stackComponents.registerComponents(
            locationPath.split('/')[4],
            workspace as string,
          ),
        },
        {
          name: titleCase(flavor.name),
          clickable: true,
          to: routePaths.stackComponents.configureComponent(
            locationPath.split('/')[4],
            workspace as string,
            id,
          ),
        },
      ]}
      title="Configuring your component"
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default RegisterComponents;
