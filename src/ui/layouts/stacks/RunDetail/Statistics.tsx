import React from 'react';
import { CommandBox } from '../../common/CommandBox';
import { BASE_COMMAND } from './constants';

export const Statistics: React.FC<{ runId: TId; pipelineId: TId }> = ({
  runId,
  pipelineId,
}) => (
  <CommandBox command={`${BASE_COMMAND} statistics ${pipelineId}:${runId}`} />
);
