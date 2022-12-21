/* eslint-disable */

import React, { useEffect } from 'react';

import { useLocationPath, usePushRoute } from '../hooks';

import { routePaths } from '../../routes/routePaths';
import { DEFAULT_PROJECT_NAME } from '../../constants';

const GreyBoxWithIcon: React.FC<{
  title: string;
  buttonText: string;
  IconComponent: React.ReactNode;
  onClick: () => void;
}> = () => {
  return <></>;
};

export const DashBoard: React.FC = () => {
  const { push } = usePushRoute();
  const locationPath = useLocationPath();
  const url = window.location.pathname;

  useEffect(() => {
    if (url === '/') {
      push(routePaths.login);
    }

    if (url.includes('projects')) {
      const projectFromUrl = locationPath.split('/')[2];

      push(
        routePaths.dashboard(
          projectFromUrl ? projectFromUrl : DEFAULT_PROJECT_NAME,
        ),
      );
    }
  }, []);

  return <></>;
};

export default DashBoard;
