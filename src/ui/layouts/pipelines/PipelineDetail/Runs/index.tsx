import React from 'react';
import { translate } from '../translate';
import { RunsTable } from '../../RunsTable';
import { useService } from './useService';

export const Runs: React.FC<{ pipelineId: TId; filter: any }> = ({
  pipelineId,
  filter,
}) => {
  const { fetching, runIds } = useService({ pipelineId });

  return (
    <RunsTable
      fetching={fetching}
      emptyStateText={translate('emptyState.text')}
      runIds={runIds}
      filter={filter}
    />
  );
};
