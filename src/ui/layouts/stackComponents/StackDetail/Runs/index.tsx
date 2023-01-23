import React, { useState } from 'react';
import { translate } from '../translate';
import { RunsTable } from '../../RunsTable';
import { useService } from './useService';

export const Runs: React.FC<{ stackComponentId: TId; filter?: any }> = ({
  stackComponentId,
  filter,
}) => {
  const [sortBy, setSortBy] = useState('created');
  function getSorted(activeSorting: any, activeSortingDirection: any) {
    setSortBy(activeSorting);
    // console.log(activeSorting, activeSortingDirection, 'aaaaaaa');
  }
  const { fetching, runIds, runsPaginated } = useService({
    stackComponentId,
    filter,
    sortBy,
  });
  console.log(fetching, 'fetching');
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
