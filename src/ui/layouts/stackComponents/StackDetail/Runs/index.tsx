import React, { useState } from 'react';
import { translate } from '../translate';
import { RunsTable } from '../../RunsTable';
import { useService } from './useService';

export const Runs: React.FC<{
  isExpended?: any;
  stackComponentId: TId;
  filter?: any;
  runId?: any;
  pagination?: boolean;
}> = ({ stackComponentId, filter, pagination, runId, isExpended = false }) => {
  const [sortBy, setSortBy] = useState('created');
  function getSorted(activeSorting: any, activeSortingDirection: any) {
    setSortBy(activeSortingDirection?.toLowerCase() + ':' + activeSorting);
  }
  const { fetching, runIds, runsPaginated } = useService({
    isExpended,
    stackComponentId,
    filter,
    sortBy,
  });

  return (
    <RunsTable
      isExpended={isExpended}
      stackComponentId={stackComponentId}
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
