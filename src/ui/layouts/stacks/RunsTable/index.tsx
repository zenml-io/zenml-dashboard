import React, { useEffect } from 'react';
import { projectSelectors } from '../../../../redux/selectors';
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
  getSorted?: any;
  runIds: TId[];
  paginated?: any;
  pagination?: boolean;
  emptyStateText: string;
  fetching: boolean;
  filter?: any;
}> = ({
  getSorted,
  runIds,
  pagination = true,
  paginated,
  emptyStateText,
  fetching,
  filter,
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
  const selectedProject = useSelector(projectSelectors.selectedProject);

  const openDetailPage = (run: TRun) => {
    setSelectedRunIds([]);
    history.push(
      routePaths.run.stack.statistics(selectedProject, run.id, run.stack.id),
    );
  };

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
      activeSorting={activeSorting}
      // activeSorting={
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
