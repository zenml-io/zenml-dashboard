import React, { useState } from 'react';
import { translate } from '../translate';
import { RunsTable } from '../../RunsTable';
import { useService } from './useService';

export const Runs: React.FC<{
  isExpended?: any;

  pipelineId: TId;
  filter: any;
  runId?: any;
  pagination?: boolean;
}> = ({
  pipelineId,
  filter,
  pagination,
  runId,

  isExpended = false,
}) => {
  const [sortBy, setSortBy] = useState('created');
  function getSorted(activeSorting: any, activeSortingDirection: any) {
    setSortBy(activeSortingDirection?.toLowerCase() + ':' + activeSorting);
  }
  const { fetching, runIds, runsPaginated } = useService({
    isExpended,
    sortBy,
    pipelineId,
    filter,
  });

  return (
    <RunsTable
      isExpended={isExpended}
      pipelineId={pipelineId}
      id={runId}
      pagination={pagination}
      getSorted={getSorted}
      paginated={runsPaginated}
      fetching={runId === undefined && fetching}
      emptyStateText={translate('emptyState.text')}
      runIds={runId === undefined ? runIds : [runId]}
      filter={filter}
    />
  );
};
