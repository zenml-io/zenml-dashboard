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
import { repositoryActions } from '../../../../redux/actions';
import RepositoryDetailHeader from './components/detail-header';

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

  const repository = useSelector(
    repositorySelectors.repositoryByID(repositoryID),
  );

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const locationPath = useLocationPath();

  return (
    <BasePage
      tabPages={[
        {
          text: 'Overview',
          Component: () => <div></div>,
          path: routePaths.repositories.overview(
            selectedWorkspace ? selectedWorkspace : locationPath.split('/')[2],
            repositoryID,
          ),
        },
        {
          text: 'Runs',
          Component: () => <div></div>,
          path: routePaths.repositories.runs(
            selectedWorkspace ? selectedWorkspace : locationPath.split('/')[2],
            repositoryID,
          ),
        },
      ]}
      singleTab={true}
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
      <RepositoryDetailHeader repository={repository!} />
    </BasePage>
  );
}

export default RepositoryDetailOverview;
