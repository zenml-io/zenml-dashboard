import React, { useEffect } from 'react';
import { workspaceSelectors } from '../../../../redux/selectors';
import { routePaths } from '../../../../routes/routePaths';
import { useHistory, useSelector } from '../../../hooks';

import { Table } from '../../common/Table';

import { useHeaderCols } from './HeaderCols';
import { useService } from './useService';
interface filterValue {
  label: string;
  type: string;
  value: string;
}
interface Props {
  filter: any;
}
export const RunsTable: React.FC<{
  stackId?: any;
  getSorted?: any;
  runIds: TId[];
  paginated?: any;
  pagination?: boolean;
  emptyStateText: string;
  fetching: boolean;
  filter?: any;
  id?: any;
}> = ({
  stackId,
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

  const {
    sortedRuns,
    setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
  } = useService({ runIds, filter });
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  const openDetailPage = (run: TRun) => {
    setSelectedRunIds([]);
    if (id) {
      history.push(routePaths.stack.runs(selectedWorkspace, stackId));
      // debugger;
    } else {
      history.push(
        routePaths.run.stack.statistics(
          selectedWorkspace,
          run.id,
          run.stack.id,
        ),
      );
    }
  };

  // const openDetailPage = (run: TRun) => {
  //   setSelectedRunIds([]);

  //   if (id) {
  //     history.push(
  //       routePaths.stackComponents.runs(
  //         locationPath.split('/')[4],
  //         stackComponentId,
  //         selectedProject,
  //       ),
  //     );
  //     // debugger;
  //   } else {
  //     history.push(
  //       routePaths.run.component.statistics(
  //         locationPath.split('/')[4],
  //         run.stackComponentId,
  //         run.id,
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
      activeSortingDirection={activeSortingDirection}
      activeSorting={
        activeSortingDirection?.toLowerCase() + ':' + activeSorting
      } // activeSorting={
      //   activeSorting !== 'created' && activeSortingDirection !== 'ASC'
      //     ? activeSorting
      //     : 'created'
      // }
      pagination={pagination}
      loading={fetching}
      filters={filter}
      showHeader={true}
      paginated={paginated}
      headerCols={headerCols}
      tableRows={sortedRuns}
      emptyState={{ text: emptyStateText }}
      trOnClick={openDetailPage}
    />
  );
};
