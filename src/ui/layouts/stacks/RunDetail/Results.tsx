import React from 'react';
import { CommandBox } from '../../common/CommandBox';
import { BASE_COMMAND } from './constants';

export const Results: React.FC<{ runId: TId; stackId: TId }> = ({
  runId,
  stackId,
}) => <CommandBox command={`${BASE_COMMAND} results ${stackId}:${runId}`} />;
