import React from 'react';
import BasePage from '../repository-layout';
import { routePaths } from '../../../../routes/routePaths';
import { useSelector } from 'react-redux';
import { workspaceSelectors } from '../../../../redux/selectors';
import { useLocationPath } from '../../../hooks';

function CreateRepositoryBody() {
  return <p>Test</p>;
}

function CreateRepository() {
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const locationPath = useLocationPath();
  return (
    <BasePage
      tabPages={[
        {
          text: 'Create Repository',
          Component: CreateRepositoryBody,
          path: routePaths.repositories.create(
            selectedWorkspace ? selectedWorkspace : locationPath.split('/')[2],
          ),
        },
      ]}
      tabBasePath={routePaths.repositories.list(selectedWorkspace)}
      breadcrumbs={[
        {
          name: 'Repositories',
          clickable: true,
          to: routePaths.repositories.list(selectedWorkspace),
        },
      ]}
      title="Repositories"
      headerWithButtons
      renderHeaderRight={() => <></>}
    />
  );
}

export default CreateRepository;
