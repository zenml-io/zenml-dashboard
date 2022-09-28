import React from 'react';
import { routePaths } from '../../../../routes/routePaths';
import { useHistory } from '../../../hooks';

import { Table } from '../../common/Table';

import { useHeaderCols } from './HeaderCols';
import { useService } from './useService';

export const RunsTable: React.FC<{
  runIds: TId[];
  pagination?: boolean;
  emptyStateText: string;
  fetching: boolean;
  pipelineRuns?: any;
  fromAllruns?: boolean;
}> = ({
  runIds,
  pagination = true,
  emptyStateText,
  fetching,
  pipelineRuns,
  fromAllruns,
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
  } = useService({ pipelineRuns, runIds });

  const openDetailPage = (run: TRun) => {
    setSelectedRunIds([]);

    fromAllruns
      ? history.push(routePaths.run.run.statistics(run.id, run.pipelineId))
      : history.push(
          routePaths.run.pipeline.statistics(run.id, run.pipelineId),
        );
  };

  const headerCols = useHeaderCols({
    runs: pipelineRuns ? pipelineRuns : sortedRuns,
    setRuns: setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    nestedRuns: pipelineRuns ? true : false,
  });

  return (
    <Table
      pagination={pagination}
      loading={fetching}
      showHeader={true}
      headerCols={headerCols}
      tableRows={pipelineRuns ? pipelineRuns : sortedRuns}
      emptyState={{ text: emptyStateText }}
      trOnClick={openDetailPage}
    />
  );
};
