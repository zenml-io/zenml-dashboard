import React from 'react';
import { translate } from '../translate';
import { RunsTable } from '../../RunsTable';
import { useService } from './useService';

export const Runs: React.FC<{ stackId: TId; filter: any }> = ({
  stackId,
  filter,
}) => {
  const { fetching, runIds, runsPaginated } = useService({ stackId, filter });
  // console.log(filter, 'filter11');
  return (
    <RunsTable
      fetching={fetching}
      paginated={runsPaginated}
      emptyStateText={translate('emptyState.text')}
      runIds={runIds}
      filter={filter}
    />
  );
};
