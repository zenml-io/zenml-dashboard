import React, { useEffect } from 'react';
import { routePaths } from '../../../../routes/routePaths';
import { useHistory, useLocationPath, useSelector } from '../../../hooks';

import { Table } from '../../common/Table';

import { useHeaderCols } from './HeaderCols';
import { useService } from './useService';
import { workspaceSelectors } from '../../../../redux/selectors';

export const RunsTable: React.FC<{
  stackComponentId?: any;
  getSorted?: any;
  runIds: TId[];
  paginated?: any;
  pagination?: boolean;
  emptyStateText: string;
  fetching: boolean;
  filter?: any;
  id?: any;
}> = ({
  stackComponentId,
  getSorted,
  runIds,
  pagination = true,
  paginated,
  emptyStateText,
  fetching,
  filter,
  id,
}) => {
  const history = useHistory();
  const locationPath = useLocationPath();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  // debugger;
  const {
    sortedRuns,
    setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
  } = useService({ runIds, filter });

  const openDetailPage = (run: TRun) => {
    setSelectedRunIds([]);

    if (id) {
      history.push(
        routePaths.stackComponents.runs(
          locationPath.split('/')[4],
          stackComponentId,
          selectedWorkspace,
        ),
      );
      // debugger;
    } else {
      history.push(
        routePaths.run.component.statistics(
          locationPath.split('/')[4],
          run.stackComponentId,
          run.id,
          selectedWorkspace,
        ),
      );
    }
  };

  // const openDetailPage = (stackComponent: TStack) => {
  //   setSelectedRunIds([]);

  //   if (id) {
  //     history.push(
  //       routePaths.stackComponents.base(
  //         locationPath.split('/')[4],
  //         selectedProject,
  //       ),
  //     );
  //   } else {
  //     history.push(
  //       routePaths.stackComponents.configuration(
  //         locationPath.split('/')[4],
  //         stackComponent.id,
  //         selectedProject,
  //       ),
  //     );
  //   }
  // };

  const headerCols = useHeaderCols({
    runs: sortedRuns,
    setRuns: setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  });

  useEffect(() => {
    getSorted(activeSorting, activeSortingDirection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSorted]);
  return (
    <Table
      activeSorting={
        activeSortingDirection?.toLowerCase() + ':' + activeSorting
      }
      // activeSorting={
      //   activeSorting !== 'created' && activeSortingDirection !== 'ASC'
      //     ? activeSorting
      //     : 'created'
      // }
      pagination={pagination}
      loading={fetching}
      showHeader={true}
      filters={filter}
      paginated={paginated}
      headerCols={headerCols}
      tableRows={sortedRuns}
      emptyState={{ text: emptyStateText }}
      trOnClick={openDetailPage}
    />
  );
};
