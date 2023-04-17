import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { repositoryActions } from '../../../../redux/actions/repositories';
import {
  repositorySelectors,
  workspaceSelectors,
} from '../../../../redux/selectors';
import BasePage from '../repository-layout';
import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import FilterComponent, {
  getInitialFilterStateForSecrets,
} from '../../../components/Filters';
import { Box } from '../../../components';
import { useLocationPath } from '../../../hooks';
import RepositoryGrid from './grid';

const FilterWrapper = () => {
  // TODO: Dev please note: getInitialFilterState is for stack inital filter value for any other component you need to modify it
  const [filters, setFilter] = useState([getInitialFilterStateForSecrets()]);

  const repositories = useSelector(repositorySelectors.allRepositories);

  // function getFilter(values: any) {
  //   const filterValuesMap = values.map((v: any) => {
  //     return {
  //       column: v.column.selectedValue,
  //       type: v.contains.selectedValue,
  //       value: v.filterValue,
  //     };
  //   });
  //   return filterValuesMap;
  // }
  return (
    <Box style={{ marginTop: '-20px', width: '100%' }}>
      <FilterComponent
        getInitials={getInitialFilterStateForSecrets}
        filters={filters}
        setFilter={setFilter}
      >
        <RepositoryGrid repositories={repositories} />
      </FilterComponent>
    </Box>
  );
};

function RepositoriesList() {
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const locationPath = useLocationPath();

  useEffect(() => {
    dispatch(repositoryActions.getAll({ workspace: selectedWorkspace }));
  }, [selectedWorkspace, dispatch]);
  return (
    <BasePage
      tabPages={[
        {
          text: translate('tabs.secrets.text'),
          Component: FilterWrapper,
          path: routePaths.repositories.list(
            selectedWorkspace ? selectedWorkspace : locationPath.split('/')[2],
          ),
        },
      ]}
      tabBasePath={routePaths.repositories.list(selectedWorkspace)}
      breadcrumbs={
        [
          // {
          //   name: translate('header.breadcrumbs.stacks.text'),
          //   clickable: true,
          //   // to: routePaths.stacks.base,
          //   to: routePaths.stacks.list(
          //     selectedWorkspace ? selectedWorkspace : locationPath.split('/')[2],
          //   ),
          // },
        ]
      }
      title="Repositories"
      headerWithButtons
      renderHeaderRight={() => <></>}
    ></BasePage>
  );
}

export default RepositoriesList;
