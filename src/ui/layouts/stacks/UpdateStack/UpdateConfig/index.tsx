import React from 'react';

import { ListForAll } from './ListForAll';
import { BasePage } from '../../BasePage';
import { routePaths } from '../../../../../routes/routePaths';
import { useLocationPath, useSelector } from '../../../../hooks';
import { workspaceSelectors } from '../../../../../redux/selectors';

export const UpdateConfig: React.FC<{
  stack: any;
}> = ({ stack }) => {
  const locationPath = useLocationPath();

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  return (
    <BasePage
      fromRegisterComponent={true}
      tabPages={[
        {
          text: '',
          Component: () => <ListForAll stackDetails={stack}></ListForAll>,
          path: routePaths.stacks.UpdateStack(
            selectedWorkspace
              ? selectedWorkspace
              : (locationPath.split('/')[2] as string),
            stack.id,
          ),
        },
      ]}
      tabBasePath={routePaths.stacks.UpdateStack(
        selectedWorkspace
          ? selectedWorkspace
          : (locationPath.split('/')[2] as string),
        stack.id,
      )}
      breadcrumbs={[]}
      title="Update the stack"
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
};

export default UpdateConfig;
