import React, { useState } from 'react';
import { translate } from '../translate';
import { RunsTable } from '../../RunsTable';
import { useService } from './useService';

export const Runs: React.FC<{
  isExpended?: any;
  fromAllruns?: boolean;
  pipelineId: TId;
  filter: any;
  runId?: any;
  pagination?: boolean;
}> = ({ pipelineId, filter, pagination, runId, fromAllruns, isExpended }) => {
  const [sortBy, setSortBy] = useState('created');
  function getSorted(activeSorting: any, activeSortingDirection: any) {
    setSortBy(activeSortingDirection?.toLowerCase() + ':' + activeSorting);
    // console.log(activeSorting, activeSortingDirection, 'aaaaaaa');
  }
  const { fetching, runIds, runsPaginated } = useService({
    isExpended,
    sortBy,
    pipelineId,
    filter,
  });

  return (
    <RunsTable
      pipelineId={pipelineId}
      id={runId}
      pagination={pagination}
      getSorted={getSorted}
      fromAllruns={fromAllruns}
      paginated={runsPaginated}
      fetching={runId === undefined && fetching}
      emptyStateText={translate('emptyState.text')}
      runIds={runId === undefined ? runIds : [runId]}
      filter={filter}
    />
  );
};
