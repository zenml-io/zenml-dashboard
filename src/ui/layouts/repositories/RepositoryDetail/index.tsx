import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLocationPath } from '../../../hooks';
import BasePage from '../repository-layout';
import { routePaths } from '../../../../routes/routePaths';
import {
  repositoryPagesSelectors,
  repositorySelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import {
  repositoryActions,
  repositoryPagesActions,
} from '../../../../redux/actions';
import RepositoryDetailHeader from './components/detail-header';
import DetailOverview from './Overview';
import FilterComponent, {
  getInitialFilterStateForRuns,
} from '../../../components/Filters';
import { Box } from '../../../components';
import { Runs } from './Runs';
import { translate } from './translate';

const FilterWrapperForRun = () => {
  const locationPath = useLocationPath();

  // TODO: Dev please note: getInitialFilterState is for stack inital filter value for any other component you need to modify it
  const [filters, setFilter] = useState([getInitialFilterStateForRuns()]);
  function getFilter(values: any) {
    const filterValuesMap = values.map((v: any) => {
      return {
        column: v.column.selectedValue,
        type: v.contains.selectedValue,
        value: v.filterValue,
      };
    });
    return filterValuesMap;
  }
  return (
    <Box marginTop="lg" style={{ width: '100%' }}>
      <FilterComponent
        getInitials={getInitialFilterStateForRuns}
        filters={filters}
        setFilter={setFilter}
      >
        <Runs
          filter={getFilter(filters)}
          repositoryId={locationPath.split('/')[4]}
        />
      </FilterComponent>
    </Box>
  );
};

function RepositoryDetailOverview() {
  const dispatch = useDispatch();
  const { repositoryID } = useParams() as {
    repositoryID: string;
    workspace: string;
  };
  useEffect(() => {
    dispatch(repositoryPagesActions.setFetching({ fetching: true }));
    dispatch(
      repositoryActions.getByID({
        onSuccess() {
          dispatch(repositoryPagesActions.setFetching({ fetching: false }));
        },
        onFailure() {
          dispatch(repositoryPagesActions.setFetching({ fetching: false }));
        },
        repositoryID: repositoryID,
      }),
    );
  }, [repositoryID, dispatch]);

  const repository = useSelector(
    repositorySelectors.repositoryByID(repositoryID),
  );

  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const isFetching = useSelector(repositoryPagesSelectors.fetching);
  const locationPath = useLocationPath();

  return (
    <BasePage
      tabPages={[
        {
          text: translate('overview.text'),
          Component: () => (
            <DetailOverview
              repositoryID={repositoryID}
              isLoading={isFetching}
            />
          ),
          path: routePaths.repositories.overview(
            selectedWorkspace ? selectedWorkspace : locationPath.split('/')[2],
            repositoryID,
          ),
        },
        {
          text: translate('runs.text'),
          Component: FilterWrapperForRun,
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
        {
          name: repositoryID,
          clickable: true,
          to: routePaths.repositories.overview(selectedWorkspace, repositoryID),
        },
      ]}
      title="Repositories"
      headerWithButtons
      renderHeaderRight={() => <></>}
    >
      <RepositoryDetailHeader repository={repository} />
    </BasePage>
  );
}

export default RepositoryDetailOverview;
