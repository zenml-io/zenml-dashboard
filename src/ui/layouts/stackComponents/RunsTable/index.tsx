import React from 'react';
import { routePaths } from '../../../../routes/routePaths';
import { useHistory, useLocationPath } from '../../../hooks';

import { Table } from '../../common/Table';

import { useHeaderCols } from './HeaderCols';
import { useService } from './useService';

export const RunsTable: React.FC<{
  runIds: TId[];
  pagination?: boolean;
  emptyStateText: string;
  fetching: boolean;
  filter?: any;
}> = ({ runIds, pagination = true, emptyStateText, fetching, filter }) => {
  const history = useHistory();
  const locationPath = useLocationPath();
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
    history.push(
      routePaths.run.component.statistics(
        locationPath.split('/')[2],
        run.stackComponentId,
        run.id,
      ),
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
