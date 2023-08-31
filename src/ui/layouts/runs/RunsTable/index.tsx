import React from 'react';
import { routePaths } from '../../../../routes/routePaths';
import { useHistory } from '../../../hooks';

import { Table } from '../../common/Table';

import { useHeaderCols } from './HeaderCols';
import { useService } from './useService';
import { Run } from '../../../../api/types';

export const RunsTable: React.FC<{
  runIds: TId[];
  pagination?: boolean;
  emptyStateText: string;
  fetching: boolean;
}> = ({ runIds, pagination = true, emptyStateText, fetching }) => {
  const history = useHistory();

  const {
    sortedRuns,
    setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
  } = useService({ runIds });

  const openDetailPage = (run: Run) => {
    setSelectedRunIds([]);
    history.push(
      routePaths.run.run.statistics(run.id, run.pipeline?.id as string),
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
