import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLocationPath } from '../../../hooks';
import BasePage from '../repository-layout';
import { routePaths } from '../../../../routes/routePaths';
import {
  repositorySelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import RepositoryOverviewPage from './page';
import { repositoryActions } from '../../../../redux/actions';

function RepositoryDetailOverview() {
  const dispatch = useDispatch();
  const { repositoryID } = useParams() as {
    repositoryID: string;
    workspace: string;
  };
  useEffect(() => {
    dispatch(
      repositoryActions.getByID({
        repositoryID: repositoryID,
      }),
    );
  }, [repositoryID, dispatch]);

  const repositoryByID = useSelector(
    repositorySelectors.repositoryByID(repositoryID),
  );

  console.log(repositoryByID);

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const locationPath = useLocationPath();
  return (
    <BasePage
      tabPages={[
        {
          text: 'Create Repository',
          Component: RepositoryOverviewPage,
          path: routePaths.repositories.overview(
            selectedWorkspace ? selectedWorkspace : locationPath.split('/')[2],
            repositoryID,
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
    >
      {JSON.stringify(repositoryByID)}
    </BasePage>
  );
}

export default RepositoryDetailOverview;
