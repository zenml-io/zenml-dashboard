import React from 'react';
import { translate } from '../translate';
import { RunsTable } from '../../RunsTable';
import { useService } from './useService';

export const Runs: React.FC<{ stackId: TId }> = ({ stackId }) => {
  const { fetching, runIds } = useService({ stackId });
  // debugger;

  return (
    <RunsTable
      fetching={fetching}
      emptyStateText={translate('emptyState.text')}
      runIds={runIds}
    />
  );
};
