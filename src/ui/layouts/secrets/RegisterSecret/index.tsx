import React, { useEffect, useState } from 'react';

import { Register } from './Register';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useLocation, useLocationPath, useSelector } from '../../../hooks';

import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
import { workspaceSelectors } from '../../../../redux/selectors';

export const CreateStack: React.FC = () => {
  const locationPath = useLocationPath();

  const location = useLocation();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const [routeState, setRouteState] = useState({}) as any;

  useEffect(() => {
    setRouteState(location.state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRouteState]);
  const workspace = selectedWorkspace
    ? selectedWorkspace
    : DEFAULT_WORKSPACE_NAME;

  return (
    <BasePage
      fromRegisterComponent={true}
      tabPages={[
        {
          text: '',
          Component: () => <Register state={routeState}></Register>,
          path: routePaths.secrets.registerSecrets(
            selectedWorkspace
              ? selectedWorkspace
              : (locationPath.split('/')[2] as string),
          ),
        },
      ]}
      tabBasePath={
        routePaths.secrets.registerSecrets(
          selectedWorkspace
            ? selectedWorkspace
            : (locationPath.split('/')[2] as string),
        ) + `?workspace=${workspace}`
      }
      breadcrumbs={[]}
      title="Register Secret"
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default CreateStack;
