import React from 'react';
import { routePaths } from '../../../../routes/routePaths';
import { useHistory } from '../../../hooks';

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
  runIds: TId[];
  pagination?: boolean;
  emptyStateText: string;
  fetching: boolean;
  filter?: any;
}> = ({ runIds, pagination = true, emptyStateText, fetching, filter }) => {
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

  const openDetailPage = (run: TRun) => {
    setSelectedRunIds([]);
    history.push(routePaths.run.stack.statistics(run.id, run.pipelineId));
  };

  const headerCols = useHeaderCols({
    runs: sortedRuns,
    setRuns: setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  });

  return (
    <Table
      pagination={pagination}
      loading={fetching}
      showHeader={true}
      headerCols={headerCols}
      tableRows={sortedRuns}
      emptyState={{ text: emptyStateText }}
      trOnClick={openDetailPage}
    />
  );
};
