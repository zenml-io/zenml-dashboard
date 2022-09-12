import React from 'react';
import { CommandBox } from '../../common/CommandBox';
import { BASE_COMMAND } from './constants';

export const Tensorboard: React.FC<{ runId: TId; pipelineId: TId }> = ({
  runId,
  pipelineId,
}) => (
  <CommandBox command={`${BASE_COMMAND} tensorboard ${pipelineId}:${runId}`} />
);
