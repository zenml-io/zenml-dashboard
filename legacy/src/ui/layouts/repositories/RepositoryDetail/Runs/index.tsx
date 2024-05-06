import React, { useState } from 'react';
import { translate } from './translate';
import { RunsTable } from '../../RunsTable';
import { useService } from './useService';

export const Runs: React.FC<{
  isExpended?: any;
  repositoryId: TId;
  filter: any;
  runId?: any;
  pagination?: boolean;
}> = ({ repositoryId, filter, pagination, runId, isExpended = false }) => {
  const [sortBy, setSortBy] = useState('created');
  function getSorted(activeSorting: any, activeSortingDirection: any) {
    setSortBy(activeSortingDirection?.toLowerCase() + ':' + activeSorting);
  }
  const { fetching, runIds, runsPaginated } = useService({
    isExpended,
    repositoryId,
    filter,
    sortBy,
  });

  return (
    <RunsTable
      isExpended={isExpended}
      repositoryId={repositoryId}
      id={runId}
      pagination={pagination}
      getSorted={getSorted}
      fetching={runId === undefined && fetching}
      paginated={runsPaginated}
      emptyStateText={translate('emptyState.text')}
      runIds={runId === undefined ? runIds : [runId]}
      filter={filter}
    />
  );
};
