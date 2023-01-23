import React, { useState } from 'react';
import { translate } from '../translate';
import { RunsTable } from '../../RunsTable';
import { useService } from './useService';

export const Runs: React.FC<{ stackId: TId; filter: any }> = ({
  stackId,
  filter,
}) => {
  const [sortBy, setSortBy] = useState('created');
  function getSorted(activeSorting: any, activeSortingDirection: any) {
    setSortBy(activeSorting);
    // console.log(activeSorting, activeSortingDirection, 'aaaaaaa');
  }
  const { fetching, runIds, runsPaginated } = useService({
    stackId,
    filter,
    sortBy,
  });
  // console.log(filter, 'filter11');
  return (
    <RunsTable
      getSorted={getSorted}
      fetching={fetching}
      paginated={runsPaginated}
      emptyStateText={translate('emptyState.text')}
      runIds={runIds}
      filter={filter}
    />
  );
};
