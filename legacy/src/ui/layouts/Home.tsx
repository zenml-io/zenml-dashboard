/* eslint-disable */

import React, { useEffect } from 'react';

import { useLocationPath, usePushRoute, useSelector } from '../hooks';

import { routePaths } from '../../routes/routePaths';
import { DEFAULT_WORKSPACE_NAME } from '../../constants';
import { workspaceSelectors } from '../../redux/selectors';

const GreyBoxWithIcon: React.FC<{
  title: string;
  buttonText: string;
  IconComponent: React.ReactNode;
  onClick: () => void;
}> = () => {
  return <></>;
};

export const DashBoard: React.FC = () => {
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const { push } = usePushRoute();
  const locationPath = useLocationPath();
  const url = window.location.pathname;

  useEffect(() => {
    if (url === '/') {
      push(routePaths.login);
    }

    if (url.includes('workspaces')) {
      const workspaceFromUrl = locationPath.split('/')[2];

      push(
        routePaths.dashboard(
          workspaceFromUrl ? workspaceFromUrl : DEFAULT_WORKSPACE_NAME,
        ),
      );
    } else {
      push(
        routePaths.dashboard(
          selectedWorkspace ? selectedWorkspace : DEFAULT_WORKSPACE_NAME,
        ),
      );
    }
  }, []);

  return <></>;
};

export default DashBoard;
