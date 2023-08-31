import React from 'react';
import { Box } from '../../../../../components';
import { useService } from './useService';
import { Pipeline } from '../../../../../../api/types';

export const RunsForPipelineTable: React.FC<{
  pipeline: Pipeline;
  openPipelineIds: TId[];
  fetching: boolean;
  nestedRow: boolean;
}> = ({ pipeline, openPipelineIds, fetching, nestedRow }) => {
  const { isPipelineOpen } = useService({
    pipeline,
    openPipelineIds,
  });

  if (!isPipelineOpen()) return null;

  return <Box marginBottom="md"></Box>;
};
