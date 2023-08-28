import React from 'react';

import { ListForAll } from './ListForAll';
import { BasePage } from '../BasePage';
import { routePaths } from '../../../../routes/routePaths';

import { useLocationPath, useSelector } from '../../../hooks';

import { DEFAULT_WORKSPACE_NAME } from '../../../../constants';
import { workspaceSelectors } from '../../../../redux/selectors';

export const CreateStack: React.FC = () => {
  const locationPath = useLocationPath();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const workspace = selectedWorkspace
    ? selectedWorkspace
    : DEFAULT_WORKSPACE_NAME;

  return (
    <BasePage
      fromRegisterComponent={true}
      tabPages={[
        {
          text: '',
          Component: () => <ListForAll></ListForAll>,
          path: routePaths.stacks.createStack(
            selectedWorkspace
              ? selectedWorkspace
              : (locationPath.split('/')[2] as string),
          ),
        },
      ]}
      tabBasePath={
        routePaths.stacks.createStack(
          selectedWorkspace
            ? selectedWorkspace
            : (locationPath.split('/')[2] as string),
        ) + `?workspace=${workspace}`
      }
      breadcrumbs={[]}
      title="Register a stack"
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default CreateStack;
