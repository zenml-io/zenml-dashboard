import React from 'react';
import { translate } from '../translate';
import { RunsTable } from '../../RunsTable';
import { useService } from './useService';

export const Runs: React.FC<{ stackComponentId: TId; filter?: any }> = ({
  stackComponentId,
  filter,
}) => {
  const { fetching, runIds, runsPaginated } = useService({
    stackComponentId,
    filter,
  });
  console.log(fetching, 'fetching');
  return (
    <RunsTable
      paginated={runsPaginated}
      fetching={fetching}
      emptyStateText={translate('emptyState.text')}
      runIds={runIds}
      filter={filter}
    />
  );
};
