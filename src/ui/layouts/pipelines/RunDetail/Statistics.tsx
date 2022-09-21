import React from 'react';
import { CommandBox } from '../../common/CommandBox';
import { BASE_COMMAND } from './constants';
import {
  LayoutFlow,
} from '../../../components';

export const Statistics: React.FC<{ runId: TId; pipelineId: TId }> = ({
  runId,
  pipelineId,
}) => (
  <LayoutFlow />
);
