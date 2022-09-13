import React from 'react';
import { translate } from '../translate';
import { RunsTable } from '../../RunsTable';
import { useService } from './useService';

export const Runs: React.FC<{ pipelineId: TId }> = ({ pipelineId }) => {
  const { fetching, runIds } = useService({ pipelineId });

  return (
    <RunsTable
      fetching={fetching}
      emptyStateText={translate('emptyState.text')}
      runIds={runIds}
    />
  );
};
