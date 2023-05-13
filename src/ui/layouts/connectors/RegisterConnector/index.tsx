import React, { useEffect, useState } from 'react';
// import { translate } from './translate';
import { Register } from './Register';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

// import { useService } from './useService';
import {
  // useHistory,
  useLocation,
  useLocationPath,
  useSelector,
} from '../../../hooks';

// import { camelCaseToParagraph } from '../../../../utils';
// import { workspaceSelectors } from '../../../../redux/selectors';
import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
import { workspaceSelectors } from '../../../../redux/selectors';

export const CreateStack: React.FC = () => {
  const locationPath = useLocationPath();
  // const { setFetching } = useService();
  // console.log(setFetching);

  const location = useLocation();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const [routeState, setRouteState] = useState({}) as any;

  // const url_string = window.location.href;
  // const url = new URL(url_string);
  // const workspaceName = url.pathname.split('/')[2];
  useEffect(() => {
    setRouteState(location.state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRouteState]);
  const workspace = selectedWorkspace
    ? selectedWorkspace
    : DEFAULT_WORKSPACE_NAME;
  // debugger;
  return (
    <BasePage
      fromRegisterComponent={true}
      tabPages={[
        {
          text: '',
          Component: () => <Register state={routeState}></Register>,
          path: routePaths.connectors.registerConnectors(
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
        routePaths.connectors.registerConnectors(
          selectedWorkspace
            ? selectedWorkspace
            : (locationPath.split('/')[2] as string),
        ) + `?workspace=${workspace}`
      }
      breadcrumbs={
        [
          // {
          //   name: 'Register a stack',
          //   clickable: true,
          //   to:
          //     routePaths.stacks.createStack(workspace as string) +
          //     `?workspace=${workspace}`,
          // },
        ]
      }
      title="Register Connector"
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default CreateStack;
