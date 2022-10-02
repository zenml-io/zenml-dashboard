import React from 'react';
import { translate } from '../translate';
import { RunsTable } from '../../RunsTable';
import { useService } from './useService';

export const Runs: React.FC<{ stackId: TId; filter: any }> = ({
  stackId,
  filter,
}) => {
  const { fetching, runIds } = useService({ stackId });

  return (
    <RunsTable
      fetching={fetching}
      emptyStateText={translate('emptyState.text')}
      runIds={runIds}
      filter={filter}
    />
  );
};
