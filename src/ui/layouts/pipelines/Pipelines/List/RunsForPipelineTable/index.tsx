import React from 'react';

import { Box } from '../../../../../components';
import { RunsTable } from '../../../RunsTable';
import { translate } from '../../translate';
import { useService } from './useService';

export const RunsForPipelineTable: React.FC<{
  pipeline: TPipeline;
  openPipelineIds: TId[];
  fetching: boolean;
}> = ({ pipeline, openPipelineIds, fetching }) => {
  const { runIds, isPipelineOpen } = useService({
    pipeline,
    openPipelineIds,
  });

  if (!isPipelineOpen()) return null;

  return (
    <Box marginBottom="md">
      <RunsTable
        fetching={fetching}
        emptyStateText={translate('runsEmptyState.text')}
        pagination={false}
        runIds={runIds}
        pipelineRuns={pipeline.runs}
      />
    </Box>
  );
};
