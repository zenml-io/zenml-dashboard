import React from 'react';

import { Box } from '../../../../../components';

import { RunsTable } from '../../../RunsTable';
import { translate } from '../../translate';
import { useService } from './useService';

export const RunsForPipelineTable: React.FC<{
  pipeline: TPipeline;
  openPipelineIds: TId[];
  fetching: boolean;
  nestedRow: boolean;
}> = ({ pipeline, openPipelineIds, fetching, nestedRow }) => {
  const { runIds, isPipelineOpen } = useService({
    pipeline,
    openPipelineIds,
  });

  if (!isPipelineOpen()) return null;

  const nestedRunsWithStatus = pipeline.runs.map((item: any, i: number) => ({
    ...item,
    status: pipeline.status[i],
  }));

  return (
    <Box marginBottom="md">
      <RunsTable
        fetching={fetching}
        emptyStateText={translate('runsEmptyState.text')}
        pagination={false}
        runIds={runIds}
        pipelineRuns={nestedRunsWithStatus}
      />
    </Box>
  );
};
