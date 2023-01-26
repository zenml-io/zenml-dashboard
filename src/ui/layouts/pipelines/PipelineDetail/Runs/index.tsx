import React, { useState } from 'react';
import { translate } from '../translate';
import { RunsTable } from '../../RunsTable';
import { useService } from './useService';

export const Runs: React.FC<{ pipelineId: TId; filter: any }> = ({
  pipelineId,
  filter,
}) => {
  const [sortBy, setSortBy] = useState('created');
  function getSorted(activeSorting: any, activeSortingDirection: any) {
    setSortBy(activeSortingDirection?.toLowerCase() + ':' + activeSorting);
    // console.log(activeSorting, activeSortingDirection, 'aaaaaaa');
  }
  const { fetching, runIds, runsPaginated } = useService({
    sortBy,
    pipelineId,
    filter,
  });

  return (
    <RunsTable
      getSorted={getSorted}
      paginated={runsPaginated}
      fetching={fetching}
      emptyStateText={translate('emptyState.text')}
      runIds={runIds}
      filter={filter}
    />
  );
};
